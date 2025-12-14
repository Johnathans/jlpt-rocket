import { create } from 'zustand';
import { ItemProgress, ReviewSettings } from '@/lib/reviewSystem';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';

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
  loadReviewItems: () => Promise<void>;
  startReviewSession: () => void;
  endReviewSession: () => void;
  answerReviewItem: (itemId: number, type: 'vocabulary' | 'kanji' | 'sentences', isCorrect: boolean) => Promise<void>;
  nextReviewItem: () => void;
  updateReviewSettings: (settings: ReviewSettings) => void;
  getReviewStats: () => Promise<{ total: number; mastered: number; learning: number; review: number; dueToday: number }>;
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
  reviewSettings: ReviewSystemSupabase.getReviewSettings(),
  
  // Actions
  loadReviewItems: async () => {
    const dueItems = await ReviewSystemSupabase.getItemsDueForReview();
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
  
  answerReviewItem: async (itemId, type, isCorrect) => {
    // Update progress in the review system
    await ReviewSystemSupabase.updateItemProgress(itemId.toString(), type, isCorrect);
    
    // Update session stats
    const { todayReviewed, todayCorrect } = get();
    set({
      todayReviewed: todayReviewed + 1,
      todayCorrect: isCorrect ? todayCorrect + 1 : todayCorrect
    });
    
    // If incorrect, keep item in review queue; if correct, it may be removed based on mastery
    const progress = await ReviewSystemSupabase.getItemProgress(itemId.toString(), type);
    if (isCorrect && progress.masteryLevel >= 100) {
      // Note: removeFromReview not needed as updateItemProgress handles this
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
    ReviewSystemSupabase.saveReviewSettings(settings);
    set({ reviewSettings: settings });
  },
  
  getReviewStats: async () => {
    return await ReviewSystemSupabase.getStats();
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
