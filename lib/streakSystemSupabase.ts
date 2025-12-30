import { createClient } from './supabase/client';

const getSupabase = () => createClient();

export interface StreakData {
  currentStreak: number;
  lastSessionDate: string | null;
  weeklyProgress: boolean[];
  totalSessions: number;
  dailyStreaks: Record<string, boolean>;
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

  private static async getUserId(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || null;
  }

  private static getDefaultStreakData(): StreakData {
    return {
      currentStreak: 0,
      lastSessionDate: null,
      weeklyProgress: [false, false, false, false, false, false, false],
      totalSessions: 0,
      dailyStreaks: {}
    };
  }

  private static getTodayString(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  private static calculateDayDifference(date1: string, date2: string): number {
    const [y1, m1, d1] = date1.split('-').map(Number);
    const [y2, m2, d2] = date2.split('-').map(Number);
    const firstDate = new Date(y1, m1 - 1, d1);
    const secondDate = new Date(y2, m2 - 1, d2);
    const diffTime = secondDate.getTime() - firstDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  private static calculateWeeklyProgress(lastSessionDate: string | null, currentStreak: number): boolean[] {
    if (!lastSessionDate) {
      return [false, false, false, false, false, false, false];
    }
    const today = new Date(lastSessionDate);
    const dayOfWeek = (today.getDay() + 6) % 7;
    const weeklyProgress = [false, false, false, false, false, false, false];
    const streakDays = Math.min(currentStreak, 7);
    for (let i = 0; i < streakDays; i++) {
      const dayIndex = (dayOfWeek - i + 7) % 7;
      weeklyProgress[dayIndex] = true;
    }
    return weeklyProgress;
  }

  /**
   * Load streak from Supabase - Server is source of truth
   */
  private static async loadFromSupabase(): Promise<StreakData | null> {
    const userId = await this.getUserId();
    if (!userId) return null;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;

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
   * Save streak to Supabase
   */
  private static async saveToSupabase(data: StreakData): Promise<boolean> {
    const userId = await this.getUserId();
    if (!userId) return false;

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
      console.error('[StreakSystem] Failed to save:', error);
      return false;
    }

    console.log(`[StreakSystem] Saved to Supabase: streak=${data.currentStreak}, lastSession=${data.lastSessionDate}`);
    return true;
  }

  /**
   * Get streak data - always loads from Supabase (server is source of truth)
   */
  static async getStreakData(): Promise<StreakData> {
    const data = await this.loadFromSupabase();
    if (!data) return this.getDefaultStreakData();
    
    // Cache to localStorage for offline display
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
    
    return data;
  }

  /**
   * Sync from Supabase - just an alias for getStreakData
   */
  static async syncWithSupabase(): Promise<StreakData> {
    return this.getStreakData();
  }

  /**
   * Record a completed session
   */
  static async recordSession(): Promise<StreakData> {
    const today = this.getTodayString();
    
    // Load current data from Supabase (source of truth)
    const currentData = await this.loadFromSupabase() || this.getDefaultStreakData();

    // Check if already recorded today
    if (currentData.dailyStreaks[today]) {
      console.log('[StreakSystem] Session already recorded today');
      return currentData;
    }

    // Calculate new streak based on ACTUAL Supabase data
    let newStreak = 1; // Default: start new streak
    
    if (currentData.lastSessionDate) {
      const daysDiff = this.calculateDayDifference(currentData.lastSessionDate, today);
      
      if (daysDiff === 1) {
        // Consecutive day - continue streak
        newStreak = currentData.currentStreak + 1;
        console.log(`[StreakSystem] Consecutive day - streak continued: ${newStreak}`);
      } else if (daysDiff === 0) {
        // Same day (shouldn't happen but handle it)
        newStreak = currentData.currentStreak;
      } else {
        // Gap > 1 day - start fresh
        newStreak = 1;
        console.log(`[StreakSystem] Gap of ${daysDiff} days - starting new streak`);
      }
    } else {
      console.log('[StreakSystem] First session ever');
    }

    // Create new data
    const newData: StreakData = {
      currentStreak: newStreak,
      lastSessionDate: today,
      totalSessions: currentData.totalSessions + 1,
      dailyStreaks: { ...currentData.dailyStreaks, [today]: true },
      weeklyProgress: this.calculateWeeklyProgress(today, newStreak)
    };

    // Save to Supabase
    await this.saveToSupabase(newData);

    // Cache locally
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newData));
    }

    console.log(`[StreakSystem] Session recorded: streak=${newStreak}, totalSessions=${newData.totalSessions}`);
    return newData;
  }

  /**
   * Reset streak
   */
  static async resetStreak(): Promise<void> {
    const resetData = this.getDefaultStreakData();
    await this.saveToSupabase(resetData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resetData));
    }
  }
}
