export interface StoryItem {
  id: string;
  japanese: string;
  reading?: string;
  english: string;
  type: 'kanji' | 'vocabulary';
  known: boolean;
}

export interface RecallItem {
  id: string;
  japanese: string;
  reading?: string;
  english: string;
  audio?: string;
  type: 'match' | 'listen';
}

export interface StoryData {
  id: string;
  title: string;
  image: string;
  text: string;
  textWithFurigana: string;
  items: StoryItem[];
  recallExercises: RecallItem[];
}

export const sampleStories: Record<string, StoryData> = {
  'story-1': {
    id: 'story-1',
    title: 'Story 1 - Meeting Tanaka-san',
    image: '/story-images/meeting-tanaka.jpg',
    text: '私はといっしょにとうきょうにすんでいます。',
    textWithFurigana: '<ruby>私<rt>わたし</rt></ruby>は<ruby>田中<rt>たなか</rt></ruby>さんと<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>東京<rt>とうきょう</rt></ruby>に<ruby>住<rt>す</rt></ruby>んでいます。',
    items: [
      {
        id: 'vocab-1',
        japanese: 'j\'ai faim',
        reading: 'わたし',
        english: 'I\'m hungry',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-2',
        japanese: 'j\'ai soif',
        reading: 'たなか',
        english: 'I\'m thirsty',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-3',
        japanese: 'maintenant',
        reading: 'いっしょ',
        english: 'now',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-4',
        japanese: 'il fait chaud',
        reading: 'とうきょう',
        english: 'it\'s hot (weather; temperature)',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-5',
        japanese: 'où sont les toilettes ?',
        reading: 'すんでいます',
        english: 'where are the toilets?',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-6',
        japanese: 'vous avez du Wi-Fi ?',
        reading: 'こんにちは',
        english: 'do you have Wi-Fi? (formal)',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-7',
        japanese: 'c\'est la vie !',
        reading: 'はじめまして',
        english: 'that\'s life!',
        type: 'vocabulary',
        known: false
      }
    ],
    recallExercises: [
      {
        id: 'recall-1',
        japanese: 'j\'ai faim',
        english: 'I\'m hungry',
        type: 'match'
      },
      {
        id: 'recall-2',
        japanese: 'j\'ai soif',
        english: 'I\'m thirsty',
        type: 'match'
      },
      {
        id: 'recall-3',
        japanese: 'maintenant',
        english: 'now',
        type: 'listen'
      },
      {
        id: 'recall-4',
        japanese: 'il fait chaud',
        english: 'it\'s hot (weather; temperature)',
        type: 'match'
      },
      {
        id: 'recall-5',
        japanese: 'où sont les toilettes ?',
        english: 'where are the toilets?',
        type: 'listen'
      }
    ]
  },
  'story-2': {
    id: 'story-2',
    title: 'Story 2 - 幸せの木',
    image: '/story-images/happiness-tree.jpg',
    text: 'ある村に、幸せを運んでくれると言われる古い木があった。その木の下でお願いをすると、必ず叶うと信じられていた。村の人々はその木を「幸せの木」と呼んでいた。ある日、若い女性がその木の前に立った。彼女は深い悲しみを抱えていた。家族を亡くし、一人ぼっちになってしまったのだ。彼女は木に向かってこうお願いした。「どうか私に新しい家族を与えてください。」数日後、彼女は市場で優しい男性と出会った。その男性も同じように家族を亡くしていた。二人はお互いの痛みを理解し、次第に心を通わせるようになった。やがて二人は結婚し、新しい家族を築いた。幸せの木のおかげで、彼女の願いは叶ったのだった。その後、二人は毎年その木の下で感謝のお祈りを捧げるようになった。木は今でも村の人々に希望と幸せを与え続けている。勝が何も言えずにいると、今度は受話器から、「おはよう勝、元気かい？」という、母の春江の声が聞こえてきた。勝造が受話器を春江に渡したようだった。勝は、「うん、元気だよ。」と答えた。「母さんこそ、腰痛は落ち着いたかい？」と聞いた。寒くなってくると腰痛がひどくなると、この前の電話で聞いていたからだ。「まあ、よく覚えてるわね。勝は優しい子ね。でも心配ないわよ、大丈夫。」「それよりね、そのお見合いの話なんだけどね。勝も来年で４０でしょう？」「そろそろ身を固めてもいいんじゃないかと思うのよ。」「私たちも、早く孫の顔が見たいしね。」「この広美さん、とても感じのいい人みたいよ。」「是非、一度会ってみてね。」勝は、母の言葉を聞きながら、複雑な気持ちになった。確かに、もう４０歳になる。周りの友人たちは、ほとんど結婚して家庭を築いている。自分だけが、まだ独身でいることに、時々寂しさを感じることもある。でも、仕事が忙しくて、なかなか出会いの機会がない。それに、本当に好きになれる人と出会えるかどうかも分からない。母の気持ちも分かるが、焦って結婚するのも違う気がする。でも、このまま一人でいるのも寂しい。勝は深いため息をついた。「分かったよ、母さん。今度時間を作って会ってみる。」勝はそう答えた。母は嬉しそうに「ありがとう、勝。きっといい人よ。」と言った。電話を切った後、勝は窓の外を見つめながら、自分の将来について考え込んだ。',
    textWithFurigana: '<ruby>ある<rt>ある</rt></ruby><ruby>村<rt>むら</rt></ruby>に、<ruby>幸<rt>しあわ</rt></ruby>せを<ruby>運<rt>はこ</rt></ruby>んでくれると<ruby>言<rt>い</rt></ruby>われる<ruby>古<rt>ふる</rt></ruby>い<ruby>木<rt>き</rt></ruby>があった。その<ruby>木<rt>き</rt></ruby>の<ruby>下<rt>した</rt></ruby>でお<ruby>願<rt>ねが</rt></ruby>いをすると、<ruby>必<rt>かなら</rt></ruby>ず<ruby>叶<rt>かな</rt></ruby>うと<ruby>信<rt>しん</rt></ruby>じられていた。<ruby>村<rt>むら</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>々はその<ruby>木<rt>き</rt></ruby>を「<ruby>幸<rt>しあわ</rt></ruby>せの<ruby>木<rt>き</rt></ruby>」と<ruby>呼<rt>よ</rt></ruby>んでいた。',
    items: [
      {
        id: 'vocab-8',
        japanese: '時計',
        reading: 'とけい',
        english: 'clock',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-9',
        japanese: '台',
        reading: 'だい',
        english: 'tower/platform',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-10',
        japanese: '行く',
        reading: 'いく',
        english: 'to go',
        type: 'vocabulary',
        known: false
      }
    ],
    recallExercises: [
      {
        id: 'recall-6',
        japanese: '時計',
        reading: 'とけい',
        english: 'clock',
        type: 'match'
      },
      {
        id: 'recall-7',
        japanese: '台',
        reading: 'だい',
        english: 'tower/platform',
        type: 'listen'
      }
    ]
  },
  'story-3': {
    id: 'story-3',
    title: 'Story 3 - Family Photo',
    image: 'https://via.placeholder.com/400x300/e5e7eb/374151?text=Family+Photo',
    text: '田中さんは家族の写真を見せてくれました。',
    textWithFurigana: '<ruby>田中<rt>たなか</rt></ruby>さんは<ruby>家族<rt>かぞく</rt></ruby>の<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>見<rt>み</rt></ruby>せてくれました。',
    items: [
      {
        id: 'vocab-11',
        japanese: '家族',
        reading: 'かぞく',
        english: 'family',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-12',
        japanese: '写真',
        reading: 'しゃしん',
        english: 'photograph',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-13',
        japanese: '父',
        reading: 'ちち',
        english: 'father',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-14',
        japanese: '母',
        reading: 'はは',
        english: 'mother',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-15',
        japanese: '兄',
        reading: 'あに',
        english: 'older brother',
        type: 'vocabulary',
        known: false
      }
    ],
    recallExercises: [
      {
        id: 'recall-8',
        japanese: '家族',
        reading: 'かぞく',
        english: 'family',
        type: 'match'
      },
      {
        id: 'recall-9',
        japanese: '写真',
        reading: 'しゃしん',
        english: 'photograph',
        type: 'listen'
      },
      {
        id: 'recall-10',
        japanese: '父',
        reading: 'ちち',
        english: 'father',
        type: 'match'
      }
    ]
  },
  'story-4': {
    id: 'story-4',
    title: 'Story 4 - Ramen Adventure',
    image: '/story-images/ramen-shop.jpg',
    text: '田中さんと一緒にラーメン屋に行きました。',
    textWithFurigana: '<ruby>田中<rt>たなか</rt></ruby>さんと<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>ラーメン屋<rt>らーめんや</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。',
    items: [
      {
        id: 'vocab-16',
        japanese: 'ラーメン',
        reading: 'らーめん',
        english: 'ramen',
        type: 'vocabulary',
        known: false
      },
      {
        id: 'vocab-17',
        japanese: '店',
        reading: 'みせ',
        english: 'shop/store',
        type: 'vocabulary',
        known: false
      }
    ],
    recallExercises: [
      {
        id: 'recall-11',
        japanese: 'ラーメン',
        reading: 'らーめん',
        english: 'ramen',
        type: 'match'
      }
    ]
  }
};
