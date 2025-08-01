import { create } from 'zustand';

interface TrainingItem {
  id: number;
  character: string;
  meaning: string;
  reading?: string;
  type: 'kanji' | 'vocabulary';
}

interface TrainingState {
  // Training data
  selectedItems: TrainingItem[];
  currentIndex: number;
  score: number;
  
  // UI state
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showResult: boolean;
  
  // Actions
  setSelectedItems: (items: TrainingItem[]) => void;
  selectAnswer: (answer: string, correctAnswer: string) => void;
  nextQuestion: () => void;
  resetTraining: () => void;
  getCurrentItem: () => TrainingItem | null;
  getProgress: () => number;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  // Initial state
  selectedItems: [],
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  isCorrect: null,
  showResult: false,
  
  // Actions
  setSelectedItems: (items) => set({ 
    selectedItems: items,
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    isCorrect: null,
    showResult: false
  }),
  
  selectAnswer: (answer, correctAnswer) => {
    const correct = answer === correctAnswer;
    set({ 
      selectedAnswer: answer,
      isCorrect: correct,
      showResult: true,
      score: correct ? get().score + 1 : get().score
    });
  },
  
  nextQuestion: () => {
    const { currentIndex, selectedItems } = get();
    if (currentIndex < selectedItems.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        selectedAnswer: null,
        isCorrect: null,
        showResult: false
      });
    }
  },
  
  resetTraining: () => set({
    selectedItems: [],
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    isCorrect: null,
    showResult: false
  }),
  
  getCurrentItem: () => {
    const { selectedItems, currentIndex } = get();
    return selectedItems[currentIndex] || null;
  },
  
  getProgress: () => {
    const { currentIndex, selectedItems } = get();
    return selectedItems.length > 0 ? ((currentIndex + 1) / selectedItems.length) * 100 : 0;
  }
}));