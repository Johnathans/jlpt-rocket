import { createClient } from './supabase/client';

// Use the same client instance as auth.tsx to ensure session is shared
const getSupabase = () => createClient();

export interface StreakData {
  currentStreak: number;
  lastSessionDate: string | null;
  weeklyProgress: boolean[]; // 7 days, starting from Monday
  totalSessions: number;
  dailyStreaks: Record<string, boolean>; // YYYY-MM-DD format
}

interface SupabaseStreakRow {
  id: string;
  user_id: string;
  current_streak: number;
  last_session_date: string | null;
  total_sessions: number;
  daily_streaks: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export class StreakSystemSupabase {
  private static readonly STORAGE_KEY = 'userStreak';

  /**
   * Get the current user ID from Supabase auth
   */
  private static async getUserId(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    
    // First try getSession() which uses cached session data (more reliable)
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      return session.user.id;
    }
    
    // Fallback to getUser() which makes a network request
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  }

  /**
   * Get streak data from localStorage (fallback/cache)
   */
  private static getLocalStreakData(): StreakData {
    if (typeof window === 'undefined') {
      return this.getDefaultStreakData();
    }

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return this.getDefaultStreakData();
    }

    try {
      return JSON.parse(stored);
    } catch {
      return this.getDefaultStreakData();
    }
  }

  /**
   * Save streak data to localStorage
   */
  private static saveLocalStreakData(data: StreakData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * Get default streak data
   */
  private static getDefaultStreakData(): StreakData {
    return {
      currentStreak: 0,
      lastSessionDate: null,
      weeklyProgress: [false, false, false, false, false, false, false],
      totalSessions: 0,
      dailyStreaks: {}
    };
  }

  /**
   * Load streak data from Supabase
   */
  private static async loadFromSupabase(): Promise<StreakData | null> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[StreakSystem] loadFromSupabase: No user ID');
      return null;
    }

    console.log('[StreakSystem] loadFromSupabase: Querying for user:', userId);
    
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.log('[StreakSystem] Supabase query error:', error.code, error.message);
      // PGRST116 means no rows found - this is expected for new users
      if (error.code !== 'PGRST116') {
        console.error('[StreakSystem] Unexpected error loading streak:', error);
      }
      return null;
    }
    
    if (!data) {
      console.log('[StreakSystem] No streak data found in Supabase');
      return null;
    }
    
    console.log('[StreakSystem] Found streak data in Supabase:', data);

    const row = data as SupabaseStreakRow;
    return {
      currentStreak: row.current_streak,
      lastSessionDate: row.last_session_date,
      weeklyProgress: this.calculateWeeklyProgress(row.last_session_date, row.current_streak),
      totalSessions: row.total_sessions,
      dailyStreaks: row.daily_streaks || {}
    };
  }

  /**
   * Save streak data to Supabase
   */
  private static async saveToSupabase(data: StreakData): Promise<boolean> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[StreakSystem] No user logged in, cannot save to Supabase');
      return false;
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('user_streaks')
      .upsert({
        user_id: userId,
        current_streak: data.currentStreak,
        last_session_date: data.lastSessionDate,
        total_sessions: data.totalSessions,
        daily_streaks: data.dailyStreaks
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('[StreakSystem] Failed to save to Supabase:', error);
      return false;
    }

    console.log('[StreakSystem] Saved streak to Supabase');
    return true;
  }

  /**
   * Get current streak data - tries Supabase first, falls back to localStorage
   */
  static async getStreakData(): Promise<StreakData> {
    const userId = await this.getUserId();
    
    // If user is logged in, always try Supabase first
    if (userId) {
      console.log('[StreakSystem] User logged in, loading from Supabase...');
      const supabaseData = await this.loadFromSupabase();
      if (supabaseData) {
        console.log('[StreakSystem] Loaded streak from Supabase:', supabaseData.currentStreak);
        // Update local cache
        this.saveLocalStreakData(supabaseData);
        return supabaseData;
      }
      console.log('[StreakSystem] No Supabase data, using localStorage');
    }

    // Fall back to localStorage
    const localData = this.getLocalStreakData();
    console.log('[StreakSystem] Using localStorage streak:', localData.currentStreak);
    return localData;
  }

  /**
   * Get streak data synchronously (for SSR and immediate display)
   * Uses localStorage only - call getStreakData() for Supabase sync
   */
  static getStreakDataSync(): StreakData {
    return this.getLocalStreakData();
  }

  /**
   * Record a completed session and update streak
   */
  static async recordSession(): Promise<StreakData> {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    // Get current data (prefer Supabase)
    const currentData = await this.getStreakData();

    // If already completed a session today, just return current data
    if (currentData.dailyStreaks?.[today]) {
      return currentData;
    }

    const newData = { ...currentData };
    newData.totalSessions++;
    
    // Mark today as completed
    newData.dailyStreaks = { ...(currentData.dailyStreaks || {}) };
    newData.dailyStreaks[today] = true;

    // Check if this continues the streak
    if (currentData.lastSessionDate) {
      const lastDate = new Date(currentData.lastSessionDate);
      const todayDate = new Date(today);
      const daysDifference = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDifference === 1) {
        // Consecutive day - continue streak
        newData.currentStreak++;
      } else if (daysDifference > 1) {
        // Missed days - reset streak
        newData.currentStreak = 1;
      }
      // daysDifference === 0 means same day (already handled above)
    } else {
      // First session ever
      newData.currentStreak = 1;
    }

    newData.lastSessionDate = today;

    // Update weekly progress
    newData.weeklyProgress = this.calculateWeeklyProgress(newData.lastSessionDate, newData.currentStreak);

    // Save to both localStorage and Supabase
    this.saveLocalStreakData(newData);
    await this.saveToSupabase(newData);

    return newData;
  }

  /**
   * Get daily streak status for a specific date
   */
  static hasStreakForDate(date: string): boolean {
    const data = this.getLocalStreakData();
    return data.dailyStreaks?.[date] || false;
  }

  /**
   * Calculate weekly progress based on current streak and last session date
   */
  private static calculateWeeklyProgress(lastSessionDate: string | null, currentStreak: number): boolean[] {
    if (!lastSessionDate) {
      return [false, false, false, false, false, false, false];
    }

    const today = new Date(lastSessionDate);
    const dayOfWeek = (today.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    const weeklyProgress = [false, false, false, false, false, false, false];

    // Mark days as completed based on current streak
    const streakDays = Math.min(currentStreak, 7);
    for (let i = 0; i < streakDays; i++) {
      const dayIndex = (dayOfWeek - i + 7) % 7;
      weeklyProgress[dayIndex] = true;
    }

    return weeklyProgress;
  }

  /**
   * Get streak data for display (handles SSR)
   */
  static getDisplayData(): {
    currentStreak: number;
    weeklyProgress: boolean[];
    isLoaded: boolean;
  } {
    if (typeof window === 'undefined') {
      return {
        currentStreak: 0,
        weeklyProgress: [false, false, false, false, false, false, false],
        isLoaded: false
      };
    }

    const data = this.getLocalStreakData();
    return {
      currentStreak: data.currentStreak,
      weeklyProgress: data.weeklyProgress,
      isLoaded: true
    };
  }

  /**
   * Sync local streak data with Supabase (call on login)
   */
  static async syncWithSupabase(): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[StreakSystem] No user logged in, cannot sync');
      return;
    }

    const localData = this.getLocalStreakData();
    const supabaseData = await this.loadFromSupabase();

    if (!supabaseData) {
      // No data in Supabase, upload local data
      if (localData.totalSessions > 0) {
        console.log('[StreakSystem] Uploading local streak to Supabase');
        await this.saveToSupabase(localData);
      }
      return;
    }

    // Merge: take the higher streak and more recent session
    const mergedData: StreakData = {
      currentStreak: Math.max(localData.currentStreak, supabaseData.currentStreak),
      lastSessionDate: this.getMoreRecentDate(localData.lastSessionDate, supabaseData.lastSessionDate),
      weeklyProgress: [false, false, false, false, false, false, false],
      totalSessions: Math.max(localData.totalSessions, supabaseData.totalSessions),
      dailyStreaks: { ...supabaseData.dailyStreaks, ...localData.dailyStreaks }
    };

    // Recalculate weekly progress
    mergedData.weeklyProgress = this.calculateWeeklyProgress(mergedData.lastSessionDate, mergedData.currentStreak);

    // Save merged data to both
    this.saveLocalStreakData(mergedData);
    await this.saveToSupabase(mergedData);

    console.log('[StreakSystem] Synced streak data with Supabase');
  }

  /**
   * Get the more recent of two dates
   */
  private static getMoreRecentDate(date1: string | null, date2: string | null): string | null {
    if (!date1) return date2;
    if (!date2) return date1;
    return new Date(date1) > new Date(date2) ? date1 : date2;
  }

  /**
   * Reset streak (for testing or user request)
   */
  static async resetStreak(): Promise<void> {
    const resetData = this.getDefaultStreakData();
    this.saveLocalStreakData(resetData);
    await this.saveToSupabase(resetData);
  }
}
