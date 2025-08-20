export interface StreakData {
  currentStreak: number;
  lastSessionDate: string | null;
  weeklyProgress: boolean[]; // 7 days, starting from Monday
  totalSessions: number;
  dailyStreaks: Record<string, boolean>; // YYYY-MM-DD format
}

export class StreakSystem {
  private static readonly STORAGE_KEY = 'userStreak';

  /**
   * Get current streak data from localStorage
   */
  static getStreakData(): StreakData {
    if (typeof window === 'undefined') {
      return {
        currentStreak: 0,
        lastSessionDate: null,
        weeklyProgress: [false, false, false, false, false, false, false],
        totalSessions: 0,
        dailyStreaks: {}
      };
    }

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return {
        currentStreak: 0,
        lastSessionDate: null,
        weeklyProgress: [false, false, false, false, false, false, false],
        totalSessions: 0,
        dailyStreaks: {}
      };
    }

    try {
      return JSON.parse(stored);
    } catch {
      return {
        currentStreak: 0,
        lastSessionDate: null,
        weeklyProgress: [false, false, false, false, false, false, false],
        totalSessions: 0,
        dailyStreaks: {}
      };
    }
  }

  /**
   * Save streak data to localStorage
   */
  private static saveStreakData(data: StreakData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * Record a completed session and update streak
   */
  static recordSession(): StreakData {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; // Local date format
    const currentData = this.getStreakData();

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

    this.saveStreakData(newData);
    return newData;
  }

  /**
   * Get daily streak status for a specific date
   */
  static hasStreakForDate(date: string): boolean {
    const data = this.getStreakData();
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

    const data = this.getStreakData();
    return {
      currentStreak: data.currentStreak,
      weeklyProgress: data.weeklyProgress,
      isLoaded: true
    };
  }

  /**
   * Reset streak (for testing or user request)
   */
  static resetStreak(): void {
    const resetData: StreakData = {
      currentStreak: 0,
      lastSessionDate: null,
      weeklyProgress: [false, false, false, false, false, false, false],
      totalSessions: 0,
      dailyStreaks: {}
    };
    this.saveStreakData(resetData);
  }
}
