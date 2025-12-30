export interface StoryPage {
  id: string;
  imageUrl: string;
  japanese: string;
  reading?: string;
  english: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  questionEnglish: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PageStory {
  id: string;
  title: string;
  level: string;
  pages: StoryPage[];
  comprehensionQuestions: ComprehensionQuestion[];
}

export const pageStories: PageStory[] = [
  {
    id: 'tokyo-date-1',
    title: '東京デート',
    level: 'N5',
    pages: [
      {
        id: 'page-1',
        imageUrl: '/story-images/shibuya.jpg',
        japanese: '健二と愛は、東京でデートをします。',
        reading: 'けんじとあいは、とうきょうでデートをします。',
        english: 'Kenji and Ai go on a date in Tokyo.'
      },
      {
        id: 'page-2',
        imageUrl: '/story-images/shibuya.jpg',
        japanese: '二人は、渋谷の八公像の前で会います。',
        reading: 'ふたりは、しぶやのはちこうぞうのまえであいます。',
        english: 'The two meet in front of the Hachiko statue in Shibuya.'
      },
      {
        id: 'page-3',
        imageUrl: '/story-images/shibuya.jpg',
        japanese: '健二は、愛に花をあげます。愛は、とても嬉しいです。',
        reading: 'けんじは、あいにはなをあげます。あいは、とてもうれしいです。',
        english: 'Kenji gives Ai flowers. Ai is very happy.'
      },
      {
        id: 'page-4',
        imageUrl: '/story-images/tokyo-tower.jpg',
        japanese: '二人は、東京タワーを見に行きます。',
        reading: 'ふたりは、とうきょうタワーをみにいきます。',
        english: 'The two go to see Tokyo Tower.'
      },
      {
        id: 'page-5',
        imageUrl: '/story-images/izakaya.jpg',
        japanese: '夜になりました。二人は、居酒屋でご飯を食べます。',
        reading: 'よるになりました。ふたりは、いざかやでごはんをたべます。',
        english: 'It became evening. The two eat dinner at an izakaya.'
      },
      {
        id: 'page-6',
        imageUrl: '/story-images/izakaya.jpg',
        japanese: '二人は、焼き鳥とビールを頼みます。とても美味しいです。',
        reading: 'ふたりは、やきとりとビールをたのみます。とてもおいしいです。',
        english: 'They order yakitori and beer. It is very delicious.'
      },
      {
        id: 'page-7',
        imageUrl: '/story-images/train.jpg',
        japanese: 'ご飯の後、二人は電車に乗ります。',
        reading: 'ごはんのあと、ふたりはでんしゃにのります。',
        english: 'After dinner, the two ride the train.'
      },
      {
        id: 'page-8',
        imageUrl: '/story-images/convenience-store.jpg',
        japanese: '駅の近くのコンビニに行きます。',
        reading: 'えきのちかくのコンビニにいきます。',
        english: 'They go to a convenience store near the station.'
      },
      {
        id: 'page-9',
        imageUrl: '/story-images/convenience-store.jpg',
        japanese: 'とても楽しいデートでした。二人は、また会いたいです。',
        reading: 'とてもたのしいデートでした。ふたりは、またあいたいです。',
        english: 'It was a very fun date. The two want to meet again.'
      }
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        question: '健二と愛はどこで会いましたか。',
        questionEnglish: 'Where did Kenji and Ai meet?',
        options: [
          '東京タワー',
          '渋谷の八公像の前',
          '居酒屋',
          '駅'
        ],
        correctAnswer: 1,
        explanation: '二人は渋谷の八公像の前で会いました。'
      },
      {
        id: 'q2',
        question: '健二は愛に何をあげましたか。',
        questionEnglish: 'What did Kenji give to Ai?',
        options: [
          'ビール',
          '焼き鳥',
          '花',
          'プレゼント'
        ],
        correctAnswer: 2,
        explanation: '健二は愛に花をあげました。'
      },
      {
        id: 'q3',
        question: '二人は夜に何を食べましたか。',
        questionEnglish: 'What did they eat in the evening?',
        options: [
          'ラーメン',
          '寿司',
          '焼き鳥とビール',
          'カレー'
        ],
        correctAnswer: 2,
        explanation: '二人は居酒屋で焼き鳥とビールを頼みました。'
      },
      {
        id: 'q4',
        question: 'ご飯の後、二人は何に乗りましたか。',
        questionEnglish: 'What did they ride after dinner?',
        options: [
          'バス',
          'タクシー',
          '電車',
          '自転車'
        ],
        correctAnswer: 2,
        explanation: 'ご飯の後、二人は電車に乗りました。'
      },
      {
        id: 'q5',
        question: 'このデートはどうでしたか。',
        questionEnglish: 'How was this date?',
        options: [
          'つまらなかった',
          'とても楽しかった',
          '悲しかった',
          '疲れた'
        ],
        correctAnswer: 1,
        explanation: 'とても楽しいデートでした。'
      }
    ]
  }
];
