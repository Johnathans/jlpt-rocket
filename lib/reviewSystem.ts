// Review System for Spaced Repetition Learning

export interface ItemProgress {
  id: string;
  type: 'vocabulary' | 'kanji' | 'sentences';
  correctCount: number;        // Number of times answered correctly
  incorrectCount: number;      // Number of times answered incorrectly
  lastReviewed: Date;
  nextReviewDate: Date;
  masteryLevel: number;        // 0, 25, 50, 75, 100 (percentage)
  isInReview: boolean;
  streak: number;              // Current correct streak
}

export interface ReviewSettings {
  maxReviewsPerRound: number;
  reviewOrder: 'due_date' | 'random' | 'difficulty';
  maxReviewsPerDay: number;
  intervals: {
    mastered0: number;   // 0% mastered (immediate)
    mastered25: number;  // 25% mastered 
    mastered50: number;  // 50% mastered
    mastered75: number;  // 75% mastered
    mastered100: number; // 100% mastered
  };
}

// Default review settings
export const DEFAULT_REVIEW_SETTINGS: ReviewSettings = {
  maxReviewsPerRound: 5,
  reviewOrder: 'due_date',
  maxReviewsPerDay: 50,
  intervals: {
    mastered0: 0,    // Immediate review
    mastered25: 1,   // 1 day
    mastered50: 10,  // 10 days
    mastered75: 30,  // 30 days
    mastered100: 180 // 180 days
  }
};

export class ReviewSystem {
  private static STORAGE_KEY = 'jlpt_review_progress';
  private static SETTINGS_KEY = 'jlpt_review_settings';

  // Get all progress data
  static getProgressData(): Map<string, ItemProgress> {
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

  // Clear all review data (useful when switching from hardcoded to real data)
  static clearAllReviewData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Save progress data
  static saveProgressData(progressMap: Map<string, ItemProgress>): void {
    if (typeof window === 'undefined') return;
    
    const data: Record<string, ItemProgress> = {};
    progressMap.forEach((value, key) => {
      data[key] = value;
    });
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // Get review settings
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

  // Get progress for a specific item
  static getItemProgress(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): ItemProgress {
    const key = `${itemType}_${itemId}`;
    const progressMap = this.getProgressData();
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

  // Update item progress after training session
  static updateItemProgress(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences', isCorrect: boolean): ItemProgress {
    console.log(`[ReviewSystem] Updating progress for ${itemType} ${itemId}: ${isCorrect ? 'correct' : 'incorrect'}`);
    
    const key = `${itemType}_${itemId}`;
    const progressMap = this.getProgressData();
    const settings = this.getReviewSettings();
    
    let progress = this.getItemProgress(itemId, itemType);
    const now = new Date();
    
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
    this.saveProgressData(progressMap);
    
    console.log(`[ReviewSystem] Updated progress:`, progress);
    return progress;
  }

  // Calculate next review date based on mastery level
  private static calculateNextReviewDate(
    progress: ItemProgress, 
    settings: ReviewSettings
  ): Date {
    const now = new Date();
    let daysToAdd = 0;
    
    if (progress.streak === 0) {
      // Incorrect answer - immediate review
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

  // Get items due for review
  static getItemsDueForReview(): ItemProgress[] {
    const progressMap = this.getProgressData();
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

  // Mark item as no longer in review
  static removeFromReview(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): void {
    const key = `${itemType}_${itemId}`;
    const progressMap = this.getProgressData();
    const progress = progressMap.get(key);
    
    if (progress) {
      progress.isInReview = false;
      progressMap.set(key, progress);
      this.saveProgressData(progressMap);
    }
  }

  // Manually set item as mastered (100% mastery)
  static setItemMastered(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): void {
    const key = `${itemType}_${itemId}`;
    const progressMap = this.getProgressData();
    const settings = this.getReviewSettings();
    
    let progress = this.getItemProgress(itemId, itemType);
    const now = new Date();
    
    // Set to mastered state
    progress.correctCount = Math.max(4, progress.correctCount); // Ensure at least 4 correct
    progress.masteryLevel = 100;
    progress.isInReview = false;
    progress.lastReviewed = now;
    progress.nextReviewDate = this.calculateNextReviewDate(progress, settings);
    
    progressMap.set(key, progress);
    this.saveProgressData(progressMap);
    
    console.log(`[ReviewSystem] Manually set ${itemType} ${itemId} as mastered:`, progress);
  }

  // Reset item progress to initial state
  static resetItemProgress(itemId: string, itemType: 'vocabulary' | 'kanji' | 'sentences'): void {
    const key = `${itemType}_${itemId}`;
    const progressMap = this.getProgressData();
    
    // Reset to initial state
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
    this.saveProgressData(progressMap);
    
    console.log(`[ReviewSystem] Reset progress for ${itemType} ${itemId}:`, resetProgress);
  }

  // Get statistics
  static getStats() {
    const progressMap = this.getProgressData();
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
}
