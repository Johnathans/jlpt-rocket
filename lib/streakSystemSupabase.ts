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
   * Validate if streak is still active based on last session date
   */
  private static validateStreak(data: StreakData): StreakData {
    if (!data.lastSessionDate || data.currentStreak === 0) {
      return data;
    }

    const today = this.getTodayString();
    const daysSinceLastSession = this.calculateDayDifference(data.lastSessionDate, today);

    // If more than 1 day has passed, streak is broken
    if (daysSinceLastSession > 1) {
      console.log(`[StreakSystem] Streak expired: ${daysSinceLastSession} days since last session`);
      return {
        ...data,
        currentStreak: 0,
        weeklyProgress: [false, false, false, false, false, false, false]
      };
    }

    return data;
  }

  /**
   * Get today's date as YYYY-MM-DD string
   */
  private static getTodayString(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  /**
   * Calculate day difference between two date strings (YYYY-MM-DD)
   * Returns the number of calendar days between dates
   */
  private static calculateDayDifference(date1: string, date2: string): number {
    // Parse dates as local dates (not UTC) to avoid timezone issues
    const [y1, m1, d1] = date1.split('-').map(Number);
    const [y2, m2, d2] = date2.split('-').map(Number);
    
    const firstDate = new Date(y1, m1 - 1, d1);
    const secondDate = new Date(y2, m2 - 1, d2);
    
    const diffTime = secondDate.getTime() - firstDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }

  /**
   * Get current streak data - tries Supabase first, falls back to localStorage
   * Validates streak but doesn't auto-save to Supabase to preserve cross-device data
   */
  static async getStreakData(): Promise<StreakData> {
    const userId = await this.getUserId();
    
    // If user is logged in, always try Supabase first
    if (userId) {
      console.log('[StreakSystem] User logged in, loading from Supabase...');
      const supabaseData = await this.loadFromSupabase();
      if (supabaseData) {
        console.log('[StreakSystem] Loaded streak from Supabase:', supabaseData.currentStreak);
        // Validate streak for display purposes
        const validatedData = this.validateStreak(supabaseData);
        
        // Only save to localStorage for local display
        // Don't save to Supabase here - let recordSession() or syncWithSupabase() handle that
        this.saveLocalStreakData(validatedData);
        
        if (validatedData.currentStreak !== supabaseData.currentStreak) {
          console.log('[StreakSystem] Streak expired locally (not syncing to preserve cross-device data)');
        }
        
        return validatedData;
      }
      console.log('[StreakSystem] No Supabase data, using localStorage');
    }

    // Fall back to localStorage
    const localData = this.getLocalStreakData();
    console.log('[StreakSystem] Using localStorage streak:', localData.currentStreak);
    
    // Validate local data for display
    const validatedData = this.validateStreak(localData);
    if (validatedData.currentStreak !== localData.currentStreak) {
      this.saveLocalStreakData(validatedData);
    }
    
    return validatedData;
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
    const today = this.getTodayString();
    
    // Get current data (prefer Supabase) - this will auto-validate
    const currentData = await this.getStreakData();

    // If already completed a session today, just return current data
    if (currentData.dailyStreaks?.[today]) {
      console.log('[StreakSystem] Session already recorded today');
      return currentData;
    }

    const newData = { ...currentData };
    newData.totalSessions++;
    
    // Mark today as completed
    newData.dailyStreaks = { ...(currentData.dailyStreaks || {}) };
    newData.dailyStreaks[today] = true;

    // Check if this continues the streak
    if (currentData.lastSessionDate) {
      const daysDifference = this.calculateDayDifference(currentData.lastSessionDate, today);

      if (daysDifference === 1) {
        // Consecutive day - continue streak
        newData.currentStreak = currentData.currentStreak + 1;
        console.log(`[StreakSystem] Streak continued: ${newData.currentStreak} days`);
      } else if (daysDifference === 0) {
        // Same day - shouldn't happen due to check above, but keep streak
        newData.currentStreak = currentData.currentStreak;
      } else {
        // Gap > 1 day - start new streak (currentData.currentStreak should already be 0 from validation)
        newData.currentStreak = 1;
        console.log('[StreakSystem] Starting new streak after gap');
      }
    } else {
      // First session ever or after reset
      newData.currentStreak = 1;
      console.log('[StreakSystem] First session - streak started');
    }

    newData.lastSessionDate = today;

    // Update weekly progress
    newData.weeklyProgress = this.calculateWeeklyProgress(newData.lastSessionDate, newData.currentStreak);

    // Save to both localStorage and Supabase
    this.saveLocalStreakData(newData);
    await this.saveToSupabase(newData);

    console.log(`[StreakSystem] Session recorded: streak = ${newData.currentStreak}`);
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
   * Sync with Supabase - Server is ALWAYS the source of truth
   * Simply loads from server and caches locally for display
   */
  static async syncWithSupabase(): Promise<StreakData> {
    const userId = await this.getUserId();
    if (!userId) {
      console.log('[StreakSystem] No user logged in, cannot sync');
      return this.getDefaultStreakData();
    }

    // Load from Supabase - server is source of truth
    const supabaseData = await this.loadFromSupabase();

    if (!supabaseData) {
      console.log('[StreakSystem] No streak data in Supabase yet');
      return this.getDefaultStreakData();
    }

    // Cache to localStorage for offline display only
    this.saveLocalStreakData(supabaseData);
    
    console.log(`[StreakSystem] Synced from server: streak = ${supabaseData.currentStreak}, last session = ${supabaseData.lastSessionDate}`);
    return supabaseData;
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

  /**
   * Force sync from Supabase (clears local cache and reloads)
   * Use this to debug sync issues
   */
  static async forceSyncFromSupabase(): Promise<StreakData> {
    console.log('[StreakSystem] Force sync: clearing local cache');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    
    const supabaseData = await this.loadFromSupabase();
    if (supabaseData) {
      this.saveLocalStreakData(supabaseData);
      console.log('[StreakSystem] Force synced from Supabase:', supabaseData);
      return supabaseData;
    }
    
    return this.getDefaultStreakData();
  }
}
