export interface Worksheet {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  pdf_url?: string;
  jlpt_level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'All';
  category: WorksheetCategory;
  subcategory?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  is_interactive: boolean;
  is_premium: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export type WorksheetCategory = 
  | 'Kanji'
  | 'Vocabulary'
  | 'Grammar'
  | 'Verbs'
  | 'Adjectives'
  | 'Nouns'
  | 'Particles'
  | 'Reading'
  | 'Writing'
  | 'Listening'
  | 'Speaking';

export interface WorksheetFilters {
  jlpt_levels: string[];
  categories: string[];
  difficulty: string[];
  is_interactive?: boolean;
  is_premium?: boolean;
  search?: string;
}

export interface WorksheetFilterOption {
  label: string;
  value: string;
  count?: number;
}
