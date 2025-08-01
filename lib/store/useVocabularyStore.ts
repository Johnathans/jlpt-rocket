import { create } from 'zustand';

interface VocabularyItem {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  level: string;
  example: string;
  exampleTranslation: string;
  mastered?: boolean;
}

interface VocabularyState {
  // Data
  vocabularyData: VocabularyItem[];
  selectedVocab: Set<number>;
  masteredVocab: Set<number>;
  
  // Actions
  setVocabularyData: (data: VocabularyItem[]) => void;
  toggleSelected: (id: number) => void;
  toggleMastered: (id: number) => void;
  selectAll: () => void;
  clearAll: () => void;
  getSelectedItems: () => VocabularyItem[];
}

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  // Initial state
  vocabularyData: [],
  selectedVocab: new Set(),
  masteredVocab: new Set(),
  
  // Actions
  setVocabularyData: (data) => {
    const masteredIds = new Set(data.filter(item => item.mastered).map(item => item.id));
    set({ 
      vocabularyData: data,
      masteredVocab: masteredIds
    });
  },
  
  toggleSelected: (id) => {
    const { selectedVocab } = get();
    const newSelected = new Set(selectedVocab);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    set({ selectedVocab: newSelected });
  },
  
  toggleMastered: (id) => {
    const { masteredVocab } = get();
    const newMastered = new Set(masteredVocab);
    if (newMastered.has(id)) {
      newMastered.delete(id);
    } else {
      newMastered.add(id);
    }
    set({ masteredVocab: newMastered });
  },
  
  selectAll: () => {
    const { vocabularyData } = get();
    set({ selectedVocab: new Set(vocabularyData.map(item => item.id)) });
  },
  
  clearAll: () => {
    set({ selectedVocab: new Set() });
  },
  
  getSelectedItems: () => {
    const { vocabularyData, selectedVocab } = get();
    return vocabularyData.filter(item => selectedVocab.has(item.id));
  }
}));