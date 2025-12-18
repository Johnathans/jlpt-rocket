// Enhanced Review System with Supabase Sync + localStorage Fallback

import { supabase } from './supabase';
import { ReviewSettings, DEFAULT_REVIEW_SETTINGS, ItemProgress } from './reviewSystem';

export class ReviewSystemSupabase {
  private static STORAGE_KEY = 'jlpt_review_progress';
  private static SETTINGS_KEY = 'jlpt_review_settings';
  private static LAST_SYNC_KEY = 'jlpt_last_sync_time';
  private static syncInProgress = false;
  private static CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes cache

  // Get current user ID
  private static async getUserId(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  }

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    const userId = await this.getUserId();
    return userId !== null;
  }

  // Load progress from Supabase (always authoritative when authenticated)
  static async loadProgressFromSupabase(): Promise<Map<string, ItemProgress>> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[ReviewSystem] No user logged in, using localStorage');
      return this.getProgressFromLocalStorage();
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const progressMap = new Map<string, ItemProgress>();
      
      data?.forEach((row) => {
        const key = `${row.item_type}_${row.item_id}`;
        progressMap.set(key, {
          id: row.item_id.toString(),
          type: row.item_type,
          correctCount: row.correct_count,
          incorrectCount: row.incorrect_count,
          lastReviewed: row.last_reviewed ? new Date(row.last_reviewed) : new Date(),
          nextReviewDate: row.next_review_date ? new Date(row.next_review_date) : new Date(),
          masteryLevel: row.mastery_level,
          isInReview: row.mastery_level < 100 && (row.correct_count > 0 || row.incorrect_count > 0),
          streak: 0,
        });
      });

      console.log(`[ReviewSystem] ✓ Loaded ${progressMap.size} items from Supabase (source of truth)`);
      
      // Cache to localStorage for offline access only
      this.saveProgressToLocalStorage(progressMap);
      this.updateLastSyncTime();
      
      return progressMap;
    } catch (error) {
      console.error('[ReviewSystem] Error loading from Supabase:', error);
      console.log('[ReviewSystem] Falling back to localStorage cache');
      return this.getProgressFromLocalStorage();
    }
  }

  // Save progress to Supabase
  static async saveProgressToSupabase(progressMap: Map<string, ItemProgress>): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[ReviewSystem] No user logged in, saving to localStorage only');
      this.saveProgressToLocalStorage(progressMap);
      return;
    }

    if (this.syncInProgress) {
      console.log('[ReviewSystem] Sync already in progress, skipping');
      return;
    }

    this.syncInProgress = true;

    try {
      const updates: any[] = [];
      
      progressMap.forEach((progress, key) => {
        const [type, id] = key.split('_');
        updates.push({
          user_id: userId,
          item_id: id, // Keep as string (supports UUIDs)
          item_type: type,
          mastery_level: progress.masteryLevel,
          correct_count: progress.correctCount,
          incorrect_count: progress.incorrectCount,
          last_reviewed: progress.lastReviewed.toISOString(),
          next_review_date: progress.nextReviewDate.toISOString(),
        });
      });

      // Upsert all progress records
      const { error } = await supabase
        .from('user_progress')
        .upsert(updates, {
          onConflict: 'user_id,item_id,item_type',
          ignoreDuplicates: false
        });

      if (error) throw error;

      console.log(`[ReviewSystem] Synced ${updates.length} items to Supabase`);
      
      // Also save to localStorage for offline access
      this.saveProgressToLocalStorage(progressMap);
    } catch (error) {
      console.error('[ReviewSystem] Error syncing to Supabase:', error);
      // Still save to localStorage
      this.saveProgressToLocalStorage(progressMap);
    } finally {
      this.syncInProgress = false;
    }
  }

  // Get progress from localStorage (fallback/offline mode)
  private static getProgressFromLocalStorage(): Map<string, ItemProgress> {
    if (typeof window === 'undefined') return new Map();
    
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return new Map();
    
    const data = JSON.parse(stored);
    const progressMap = new Map<string, ItemProgress>();
    
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      progressMap.set(key, {
        ...value,
        lastReviewed: new Date(value.lastReviewed),
        nextReviewDate: new Date(value.nextReviewDate)
      });
    });
    
    return progressMap;
  }

  // Save to localStorage
  private static saveProgressToLocalStorage(progressMap: Map<string, ItemProgress>): void {
    if (typeof window === 'undefined') return;
    
    const data: Record<string, ItemProgress> = {};
    progressMap.forEach((value, key) => {
      data[key] = value;
    });
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // One-time sync: Merge local data with Supabase (for users with existing local data)
  static async syncLocalDataToSupabase(): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[ReviewSystem] No user logged in, cannot sync');
      return;
    }

    const localProgress = this.getProgressFromLocalStorage();
    if (localProgress.size === 0) {
      console.log('[ReviewSystem] No local data to sync');
      return;
    }

    console.log(`[ReviewSystem] Syncing ${localProgress.size} local items to Supabase...`);
    
    try {
      // Load existing Supabase data (source of truth)
      const supabaseProgress = await this.loadProgressFromSupabase();
      
      // Merge: Keep the higher progress for each item
      localProgress.forEach((localItem, key) => {
        const supabaseItem = supabaseProgress.get(key);
        
        if (!supabaseItem) {
          // Item only exists locally, add it to server
          supabaseProgress.set(key, localItem);
        } else {
          // Item exists in both, keep the one with higher mastery
          if (localItem.masteryLevel > supabaseItem.masteryLevel) {
            supabaseProgress.set(key, localItem);
          }
        }
      });
      
      // Save merged data to Supabase (source of truth)
      await this.saveProgressToSupabase(supabaseProgress);
      
      console.log(`[ReviewSystem] ✓ Synced successfully. Total items: ${supabaseProgress.size}`);
    } catch (error) {
      console.error('[ReviewSystem] Sync failed:', error);
    }
  }

  // Get all progress data - ALWAYS from Supabase when authenticated (source of truth)
  static async getProgressData(): Promise<Map<string, ItemProgress>> {
    const isAuth = await this.isAuthenticated();
    
    if (isAuth) {
      // Always fetch from server when authenticated
      return await this.loadProgressFromSupabase();
    } else {
      // Only use localStorage when offline/not authenticated
      console.log('[ReviewSystem] Using localStorage (offline mode)');
      return this.getProgressFromLocalStorage();
    }
  }

  // Save progress data (saves to both Supabase and localStorage)
  static async saveProgressData(progressMap: Map<string, ItemProgress>): Promise<void> {
    const isAuth = await this.isAuthenticated();
    
    if (isAuth) {
      await this.saveProgressToSupabase(progressMap);
    } else {
      this.saveProgressToLocalStorage(progressMap);
    }
  }

  // Update item progress (async version)
  static async updateItemProgress(
    itemId: string, 
    itemType: 'vocabulary' | 'kanji' | 'sentences', 
    isCorrect: boolean, 
    itemContent?: any
  ): Promise<ItemProgress> {
    const key = `${itemType}_${itemId}`;
    const progressMap = await this.getProgressData();
    const settings = this.getReviewSettings();
    
    let progress = await this.getItemProgress(itemId, itemType);
    const now = new Date();
    
    // Store content data if provided
    if (itemContent && !progress.content) {
      if (itemType === 'vocabulary') {
        progress.content = {
          word: itemContent.word || itemContent.character,
          reading: itemContent.reading,
          meaning: itemContent.meaning,
          level: itemContent.level
        };
      } else if (itemType === 'kanji') {
        progress.content = {
          character: itemContent.character || itemContent.kanji,
          reading: itemContent.reading,
          meaning: itemContent.meaning,
          level: itemContent.level
        };
      } else if (itemType === 'sentences') {
        progress.content = {
          sentence: itemContent.japanese_text || itemContent.fullSentence,
          meaning: itemContent.english_translation || itemContent.meaning,
          level: itemContent.level
        };
      }
    }
    
    if (isCorrect) {
      progress.correctCount++;
      progress.streak++;
      progress.masteryLevel = Math.min(100, (progress.correctCount / 4) * 100);
    } else {
      progress.incorrectCount++;
      progress.streak = 0;
      progress.isInReview = true;
    }
    
    progress.lastReviewed = now;
    progress.nextReviewDate = this.calculateNextReviewDate(progress, settings);
    
    progressMap.set(key, progress);
    await this.saveProgressData(progressMap);
    
    console.log(`[ReviewSystem] Updated progress for ${itemType} ${itemId}:`, progress);
    return progress;
  }

  // Get item progress (async version)
  static async getItemProgress(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): Promise<ItemProgress> {
    const key = `${itemType}_${itemId}`;
    const progressMap = await this.getProgressData();
    const existing = progressMap.get(key) || {
      id: itemId,
      type: itemType,
      correctCount: 0,
      incorrectCount: 0,
      lastReviewed: new Date(),
      nextReviewDate: new Date(),
      masteryLevel: 0,
      isInReview: false,
      streak: 0
    };
    return existing;
  }

  // Set item as mastered (async version)
  static async setItemMastered(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): Promise<void> {
    const key = `${itemType}_${itemId}`;
    const progressMap = await this.getProgressData();
    const settings = this.getReviewSettings();
    
    let progress = await this.getItemProgress(itemId, itemType);
    const now = new Date();
    
    progress.correctCount = Math.max(4, progress.correctCount);
    progress.masteryLevel = 100;
    progress.isInReview = false;
    progress.lastReviewed = now;
    progress.nextReviewDate = this.calculateNextReviewDate(progress, settings);
    
    progressMap.set(key, progress);
    await this.saveProgressData(progressMap);
    
    console.log(`[ReviewSystem] Set ${itemType} ${itemId} as mastered`);
  }

  // Reset item progress (async version)
  static async resetItemProgress(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): Promise<void> {
    const key = `${itemType}_${itemId}`;
    const progressMap = await this.getProgressData();
    
    const resetProgress: ItemProgress = {
      id: itemId,
      type: itemType,
      correctCount: 0,
      incorrectCount: 0,
      lastReviewed: new Date(),
      nextReviewDate: new Date(),
      masteryLevel: 0,
      isInReview: false,
      streak: 0
    };
    
    progressMap.set(key, resetProgress);
    await this.saveProgressData(progressMap);
    
    console.log(`[ReviewSystem] Reset progress for ${itemType} ${itemId}`);
  }

  // Calculate next review date
  private static calculateNextReviewDate(progress: ItemProgress, settings: ReviewSettings): Date {
    const now = new Date();
    let daysToAdd = 0;
    
    if (progress.streak === 0) {
      daysToAdd = settings.intervals.mastered0;
    } else if (progress.masteryLevel >= 100) {
      daysToAdd = settings.intervals.mastered100;
    } else if (progress.masteryLevel >= 75) {
      daysToAdd = settings.intervals.mastered75;
    } else if (progress.masteryLevel >= 50) {
      daysToAdd = settings.intervals.mastered50;
    } else if (progress.masteryLevel >= 25) {
      daysToAdd = settings.intervals.mastered25;
    } else {
      daysToAdd = settings.intervals.mastered0;
    }
    
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return nextDate;
  }

  // Get review settings (from localStorage)
  static getReviewSettings(): ReviewSettings {
    if (typeof window === 'undefined') return DEFAULT_REVIEW_SETTINGS;
    
    const stored = localStorage.getItem(this.SETTINGS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_REVIEW_SETTINGS;
  }

  // Save review settings
  static saveReviewSettings(settings: ReviewSettings): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  // Get items due for review (async version)
  static async getItemsDueForReview(): Promise<ItemProgress[]> {
    const progressMap = await this.getProgressData();
    const now = new Date();
    
    const dueItems: ItemProgress[] = [];
    
    progressMap.forEach((progress) => {
      if (progress.isInReview || progress.nextReviewDate <= now) {
        dueItems.push(progress);
      }
    });
    
    return dueItems.sort((a, b) => 
      a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
    );
  }

  // Get statistics (async version)
  static async getStats() {
    const progressMap = await this.getProgressData();
    const stats = {
      total: 0,
      mastered: 0,
      learning: 0,
      review: 0,
      dueToday: 0
    };
    
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    progressMap.forEach((progress) => {
      stats.total++;
      
      if (progress.masteryLevel >= 100) {
        stats.mastered++;
      } else {
        stats.learning++;
      }
      
      if (progress.isInReview) {
        stats.review++;
      }
      
      if (progress.nextReviewDate <= today) {
        stats.dueToday++;
      }
    });
    
    return stats;
  }

  // Force re-sync from Supabase (useful for debugging)
  static async forceSyncFromSupabase(): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[ReviewSystem] No user logged in');
      return;
    }

    console.log('[ReviewSystem] Force syncing from Supabase...');
    const supabaseProgress = await this.loadProgressFromSupabase();
    this.saveProgressToLocalStorage(supabaseProgress);
    console.log(`[ReviewSystem] Synced ${supabaseProgress.size} items from Supabase`);
  }

  // Get last sync time
  private static getLastSyncTime(): Date | null {
    if (typeof window === 'undefined') return null;
    const timestamp = localStorage.getItem(this.LAST_SYNC_KEY);
    return timestamp ? new Date(parseInt(timestamp)) : null;
  }

  // Update last sync time
  private static updateLastSyncTime(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.LAST_SYNC_KEY, Date.now().toString());
  }

  // Check if cache is fresh (for potential future optimizations)
  static isCacheFresh(): boolean {
    const lastSync = this.getLastSyncTime();
    if (!lastSync) return false;
    return (Date.now() - lastSync.getTime()) < this.CACHE_DURATION_MS;
  }

  // Clear all review data (for testing/reset)
  static async clearAllReviewData(): Promise<void> {
    const userId = await this.getUserId();
    
    if (userId) {
      try {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', userId);
        
        if (error) throw error;
        console.log('[ReviewSystem] ✓ Cleared all Supabase data');
      } catch (error) {
        console.error('[ReviewSystem] Error clearing Supabase data:', error);
      }
    }
    
    // Also clear localStorage cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.LAST_SYNC_KEY);
      console.log('[ReviewSystem] ✓ Cleared localStorage cache');
    }
  }
}
