import { create } from 'zustand';

interface KanjiItem {
  id: number;
  kanji: string;
  meaning: string;
  level: string;
  strokes: number;
  examples: Array<{
    word: string;
    reading: string;
    meaning: string;
  }>;
  mastered?: boolean;
}

interface KanjiState {
  // Data
  kanjiData: KanjiItem[];
  selectedKanji: Set<number>;
  masteredKanji: Set<number>;
  
  // Actions
  setKanjiData: (data: KanjiItem[]) => void;
  toggleSelected: (id: number) => void;
  toggleMastered: (id: number) => void;
  selectAll: () => void;
  clearAll: () => void;
  getSelectedItems: () => KanjiItem[];
}

export const useKanjiStore = create<KanjiState>((set, get) => ({
  // Initial state
  kanjiData: [],
  selectedKanji: new Set(),
  masteredKanji: new Set(),
  
  // Actions
  setKanjiData: (data) => {
    const masteredIds = new Set(data.filter(item => item.mastered).map(item => item.id));
    set({ 
      kanjiData: data,
      masteredKanji: masteredIds
    });
  },
  
  toggleSelected: (id) => {
    const { selectedKanji } = get();
    const newSelected = new Set(selectedKanji);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    set({ selectedKanji: newSelected });
  },
  
  toggleMastered: (id) => {
    const { masteredKanji } = get();
    const newMastered = new Set(masteredKanji);
    if (newMastered.has(id)) {
      newMastered.delete(id);
    } else {
      newMastered.add(id);
    }
    set({ masteredKanji: newMastered });
  },
  
  selectAll: () => {
    const { kanjiData } = get();
    set({ selectedKanji: new Set(kanjiData.map(item => item.id)) });
  },
  
  clearAll: () => {
    set({ selectedKanji: new Set() });
  },
  
  getSelectedItems: () => {
    const { kanjiData, selectedKanji } = get();
    return kanjiData.filter(item => selectedKanji.has(item.id));
  }
}));