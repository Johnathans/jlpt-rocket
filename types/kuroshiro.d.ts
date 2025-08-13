declare module 'kuroshiro' {
  interface ConvertOptions {
    to?: 'hiragana' | 'katakana' | 'romaji';
    mode?: 'normal' | 'spaced' | 'okurigana' | 'furigana';
    romajiSystem?: 'nippon' | 'passport' | 'hepburn';
  }

  interface KuromojiToken {
    surface_form: string;
    pos: string;
    pos_detail_1: string;
    pos_detail_2: string;
    pos_detail_3: string;
    conjugated_type: string;
    conjugated_form: string;
    basic_form: string;
    reading: string;
    pronunciation: string;
  }

  class Kuroshiro {
    constructor();
    _analyzer: {
      parse(text: string): Promise<KuromojiToken[]>;
    };
    init(analyzer: any): Promise<void>;
    convert(text: string, options?: ConvertOptions): Promise<string>;
  }

  export = Kuroshiro;
}

declare module 'kuroshiro-analyzer-kuromoji' {
  interface KuromojiAnalyzerOptions {
    dictPath?: string;
  }

  class KuromojiAnalyzer {
    constructor(options?: KuromojiAnalyzerOptions);
  }

  export = KuromojiAnalyzer;
}
