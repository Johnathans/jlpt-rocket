import { create } from 'zustand';
import { ReviewSystem, ItemProgress, ReviewSettings } from '@/lib/reviewSystem';

interface ReviewState {
  // Review queue
  reviewItems: ItemProgress[];
  currentReviewIndex: number;
  reviewSessionActive: boolean;
  
  // Statistics
  todayReviewed: number;
  todayCorrect: number;
  
  // Settings
  reviewSettings: ReviewSettings;
  
  // Actions
  loadReviewItems: () => void;
  startReviewSession: () => void;
  endReviewSession: () => void;
  answerReviewItem: (itemId: number, type: 'vocabulary' | 'kanji' | 'sentences', isCorrect: boolean) => void;
  nextReviewItem: () => void;
  updateReviewSettings: (settings: ReviewSettings) => void;
  getReviewStats: () => { total: number; mastered: number; learning: number; review: number; dueToday: number };
  getCurrentReviewItem: () => ItemProgress | null;
  getReviewProgress: () => number;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  // Initial state
  reviewItems: [],
  currentReviewIndex: 0,
  reviewSessionActive: false,
  todayReviewed: 0,
  todayCorrect: 0,
  reviewSettings: ReviewSystem.getReviewSettings(),
  
  // Actions
  loadReviewItems: () => {
    const dueItems = ReviewSystem.getItemsDueForReview();
    set({ 
      reviewItems: dueItems,
      currentReviewIndex: 0
    });
  },
  
  startReviewSession: () => {
    get().loadReviewItems();
    set({ 
      reviewSessionActive: true,
      currentReviewIndex: 0,
      todayReviewed: 0,
      todayCorrect: 0
    });
  },
  
  endReviewSession: () => {
    set({ 
      reviewSessionActive: false,
      currentReviewIndex: 0,
      reviewItems: []
    });
  },
  
  answerReviewItem: (itemId, type, isCorrect) => {
    // Update progress in the review system
    ReviewSystem.updateItemProgress(itemId.toString(), type, isCorrect);
    
    // Update session stats
    const { todayReviewed, todayCorrect } = get();
    set({
      todayReviewed: todayReviewed + 1,
      todayCorrect: isCorrect ? todayCorrect + 1 : todayCorrect
    });
    
    // If incorrect, keep item in review queue; if correct, it may be removed based on mastery
    const progress = ReviewSystem.getItemProgress(itemId.toString(), type);
    if (isCorrect && progress.masteryLevel >= 100) {
      // Remove from review if mastered
      ReviewSystem.removeFromReview(itemId.toString(), type);
    }
  },
  
  nextReviewItem: () => {
    const { currentReviewIndex, reviewItems } = get();
    if (currentReviewIndex < reviewItems.length - 1) {
      set({ currentReviewIndex: currentReviewIndex + 1 });
    } else {
      // End of review session
      get().endReviewSession();
    }
  },
  
  updateReviewSettings: (settings) => {
    ReviewSystem.saveReviewSettings(settings);
    set({ reviewSettings: settings });
  },
  
  getReviewStats: () => {
    return ReviewSystem.getStats();
  },
  
  getCurrentReviewItem: () => {
    const { reviewItems, currentReviewIndex } = get();
    return reviewItems[currentReviewIndex] || null;
  },
  
  getReviewProgress: () => {
    const { currentReviewIndex, reviewItems } = get();
    return reviewItems.length > 0 ? ((currentReviewIndex + 1) / reviewItems.length) * 100 : 0;
  }
}));
