const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Load data
function loadVocabulary() {
  const vocabPath = path.join(__dirname, '../public/data/vocabulary.json');
  return JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

function loadKanji() {
  const kanjiPath = path.join(__dirname, '../public/data/kanji.json');
  return JSON.parse(fs.readFileSync(kanjiPath, 'utf8'));
}

function loadExistingSentences() {
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  return JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
}

// N5 Grammar patterns from the app
const n5GrammarPatterns = [
  'です', 'も', 'で', 'に/へ', 'に', 'を', '～ませんか', 'は', '～があります', '～がいます',
  'と', '～ましょう', '～ましょうか', '～てください', '～てもいいです', '～てはいけません',
  '～から', '～ている', '～にいく', 'ないでください', '～のがすきです', '～のがじょうずです',
  '～のがへたです', 'まだ～ていません', '～のほうが～より', '～のなかで～がいちばん～',
  'つもりです', '～く/～になる', 'stem +たいです', '～たり…～たりする', '～たことがある',
  'や', '～んです', '～すぎる', '～ほうがいい', 'ので', '～なくちゃいけない', 'でしょう',
  '～まえに', '～てから'
];

// Natural sentence generation
// This will be populated with hand-crafted natural sentences
const naturalSentences = [
  // です sentences
  { jp: '私は学生です。', en: 'I am a student.', grammar: ['です', 'は'], vocab: ['私', '学生'], difficulty: 1 },
  { jp: 'これは本です。', en: 'This is a book.', grammar: ['です'], vocab: ['本'], difficulty: 1 },
  { jp: '今日はいい天気です。', en: 'The weather is nice today.', grammar: ['です', 'は'], vocab: ['今日', '天気'], difficulty: 1 },
  { jp: '彼は先生です。', en: 'He is a teacher.', grammar: ['です', 'は'], vocab: ['彼', '先生'], difficulty: 1 },
  { jp: 'あれは私の車です。', en: 'That is my car.', grammar: ['です', 'の'], vocab: ['私', '車'], difficulty: 1 },
  
  // を sentences
  { jp: '毎日本を読みます。', en: 'I read books every day.', grammar: ['を'], vocab: ['毎日', '本', '読む'], difficulty: 1 },
  { jp: '朝ご飯を食べます。', en: 'I eat breakfast.', grammar: ['を'], vocab: ['朝', 'ご飯', '食べる'], difficulty: 1 },
  { jp: '水を飲みます。', en: 'I drink water.', grammar: ['を'], vocab: ['水', '飲む'], difficulty: 1 },
  { jp: '音楽を聞きます。', en: 'I listen to music.', grammar: ['を'], vocab: ['音楽', '聞く'], difficulty: 1 },
  { jp: '映画を見ました。', en: 'I watched a movie.', grammar: ['を'], vocab: ['映画', '見る'], difficulty: 1 },
  
  // に sentences
  { jp: '学校に行きます。', en: 'I go to school.', grammar: ['に'], vocab: ['学校', '行く'], difficulty: 1 },
  { jp: '7時に起きます。', en: 'I wake up at 7 o\'clock.', grammar: ['に'], vocab: ['時', '起きる'], difficulty: 1 },
  { jp: '友達に会います。', en: 'I meet my friend.', grammar: ['に'], vocab: ['友達', '会う'], difficulty: 1 },
  { jp: '日本に住んでいます。', en: 'I live in Japan.', grammar: ['に', '～ている'], vocab: ['日本', '住む'], difficulty: 2 },
  { jp: '図書館に本があります。', en: 'There are books in the library.', grammar: ['に', '～があります'], vocab: ['図書館', '本'], difficulty: 2 },
  
  // で sentences  
  { jp: 'レストランで食べます。', en: 'I eat at a restaurant.', grammar: ['で'], vocab: ['レストラン', '食べる'], difficulty: 1 },
  { jp: 'ペンで書きます。', en: 'I write with a pen.', grammar: ['で'], vocab: ['ペン', '書く'], difficulty: 1 },
  { jp: '電車で行きます。', en: 'I go by train.', grammar: ['で'], vocab: ['電車', '行く'], difficulty: 1 },
  { jp: '公園で遊びます。', en: 'I play in the park.', grammar: ['で'], vocab: ['公園', '遊ぶ'], difficulty: 1 },
  { jp: '日本語で話します。', en: 'I speak in Japanese.', grammar: ['で'], vocab: ['日本語', '話す'], difficulty: 1 },
  
  // と sentences
  { jp: '友達と映画を見ます。', en: 'I watch movies with my friend.', grammar: ['と', 'を'], vocab: ['友達', '映画', '見る'], difficulty: 1 },
  { jp: '母と買い物に行きます。', en: 'I go shopping with my mother.', grammar: ['と', 'に'], vocab: ['母', '買い物', '行く'], difficulty: 1 },
  { jp: 'パンと牛乳を買いました。', en: 'I bought bread and milk.', grammar: ['と', 'を'], vocab: ['パン', '牛乳', '買う'], difficulty: 1 },
  
  // ～ている sentences
  { jp: '今、勉強しています。', en: 'I am studying now.', grammar: ['～ている'], vocab: ['今', '勉強'], difficulty: 2 },
  { jp: '雨が降っています。', en: 'It is raining.', grammar: ['～ている', 'が'], vocab: ['雨', '降る'], difficulty: 2 },
  { jp: '兄は働いています。', en: 'My older brother is working.', grammar: ['～ている', 'は'], vocab: ['兄', '働く'], difficulty: 2 },
  { jp: 'ドアが開いています。', en: 'The door is open.', grammar: ['～ている', 'が'], vocab: ['ドア', '開く'], difficulty: 2 },
  
  // ～たい sentences
  { jp: '日本に行きたいです。', en: 'I want to go to Japan.', grammar: ['stem +たいです', 'に'], vocab: ['日本', '行く'], difficulty: 2 },
  { jp: 'ラーメンを食べたいです。', en: 'I want to eat ramen.', grammar: ['stem +たいです', 'を'], vocab: ['ラーメン', '食べる'], difficulty: 2 },
  { jp: '新しい車を買いたいです。', en: 'I want to buy a new car.', grammar: ['stem +たいです', 'を'], vocab: ['新しい', '車', '買う'], difficulty: 2 },
  { jp: 'もっと勉強したいです。', en: 'I want to study more.', grammar: ['stem +たいです'], vocab: ['勉強'], difficulty: 2 },
  
  // ～てください sentences
  { jp: 'ちょっと待ってください。', en: 'Please wait a moment.', grammar: ['～てください'], vocab: ['待つ'], difficulty: 2 },
  { jp: 'ゆっくり話してください。', en: 'Please speak slowly.', grammar: ['～てください'], vocab: ['話す'], difficulty: 2 },
  { jp: 'ここに名前を書いてください。', en: 'Please write your name here.', grammar: ['～てください', 'に', 'を'], vocab: ['名前', '書く'], difficulty: 2 },
  { jp: 'もう一度言ってください。', en: 'Please say it one more time.', grammar: ['～てください'], vocab: ['一度', '言う'], difficulty: 2 },
  
  // ～ましょう sentences
  { jp: '一緒に行きましょう。', en: 'Let\'s go together.', grammar: ['～ましょう'], vocab: ['一緒', '行く'], difficulty: 1 },
  { jp: '昼ご飯を食べましょう。', en: 'Let\'s eat lunch.', grammar: ['～ましょう', 'を'], vocab: ['昼', 'ご飯', '食べる'], difficulty: 1 },
  { jp: '休みましょう。', en: 'Let\'s take a break.', grammar: ['～ましょう'], vocab: ['休む'], difficulty: 1 },
  
  // ～ませんか sentences
  { jp: 'コーヒーを飲みませんか。', en: 'Would you like to drink coffee?', grammar: ['～ませんか', 'を'], vocab: ['コーヒー', '飲む'], difficulty: 2 },
  { jp: '一緒に映画を見ませんか。', en: 'Would you like to watch a movie together?', grammar: ['～ませんか', 'を'], vocab: ['一緒', '映画', '見る'], difficulty: 2 },
  
  // ～から sentences
  { jp: '忙しいから行けません。', en: 'I can\'t go because I\'m busy.', grammar: ['～から'], vocab: ['忙しい', '行く'], difficulty: 2 },
  { jp: '雨だから家にいます。', en: 'I\'m staying home because it\'s raining.', grammar: ['～から', 'に'], vocab: ['雨', '家'], difficulty: 2 },
  { jp: '疲れたから休みます。', en: 'I\'ll rest because I\'m tired.', grammar: ['～から'], vocab: ['疲れる', '休む'], difficulty: 2 },
  
  // ～ので sentences
  { jp: '時間がないので急ぎます。', en: 'I\'ll hurry because I don\'t have time.', grammar: ['ので', 'が'], vocab: ['時間', '急ぐ'], difficulty: 2 },
  { jp: '寒いので窓を閉めます。', en: 'I\'ll close the window because it\'s cold.', grammar: ['ので', 'を'], vocab: ['寒い', '窓', '閉める'], difficulty: 2 },
  
  // ～があります/います sentences
  { jp: '机の上に本があります。', en: 'There is a book on the desk.', grammar: ['～があります', 'の', 'に'], vocab: ['机', '上', '本'], difficulty: 2 },
  { jp: '部屋に猫がいます。', en: 'There is a cat in the room.', grammar: ['～がいます', 'に'], vocab: ['部屋', '猫'], difficulty: 2 },
  { jp: '冷蔵庫に牛乳があります。', en: 'There is milk in the refrigerator.', grammar: ['～があります', 'に'], vocab: ['冷蔵庫', '牛乳'], difficulty: 2 },
  
  // ～たことがある sentences
  { jp: '京都に行ったことがあります。', en: 'I have been to Kyoto.', grammar: ['～たことがある', 'に'], vocab: ['京都', '行く'], difficulty: 2 },
  { jp: '富士山を見たことがあります。', en: 'I have seen Mt. Fuji.', grammar: ['～たことがある', 'を'], vocab: ['富士山', '見る'], difficulty: 2 },
  { jp: '寿司を食べたことがあります。', en: 'I have eaten sushi.', grammar: ['～たことがある', 'を'], vocab: ['寿司', '食べる'], difficulty: 2 },
  
  // つもり sentences
  { jp: '来年日本に行くつもりです。', en: 'I intend to go to Japan next year.', grammar: ['つもりです', 'に'], vocab: ['来年', '日本', '行く'], difficulty: 2 },
  { jp: '明日早く起きるつもりです。', en: 'I intend to wake up early tomorrow.', grammar: ['つもりです'], vocab: ['明日', '早く', '起きる'], difficulty: 2 },
  
  // ～てもいいです sentences
  { jp: 'ここに座ってもいいですか。', en: 'May I sit here?', grammar: ['～てもいいです'], vocab: ['座る'], difficulty: 2 },
  { jp: '写真を撮ってもいいですか。', en: 'May I take a photo?', grammar: ['～てもいいです', 'を'], vocab: ['写真', '撮る'], difficulty: 2 },
  
  // ～てはいけません sentences
  { jp: 'ここで写真を撮ってはいけません。', en: 'You must not take photos here.', grammar: ['～てはいけません', 'で', 'を'], vocab: ['写真', '撮る'], difficulty: 2 },
  { jp: 'タバコを吸ってはいけません。', en: 'You must not smoke.', grammar: ['～てはいけません', 'を'], vocab: ['タバコ', '吸う'], difficulty: 2 },
  
  // ～まえに sentences
  { jp: '寝る前に歯を磨きます。', en: 'I brush my teeth before sleeping.', grammar: ['～まえに', 'を'], vocab: ['寝る', '前', '歯', '磨く'], difficulty: 2 },
  { jp: '出かける前に天気を見ます。', en: 'I check the weather before going out.', grammar: ['～まえに', 'を'], vocab: ['出かける', '前', '天気', '見る'], difficulty: 2 },
  
  // ～てから sentences
  { jp: 'ご飯を食べてから勉強します。', en: 'I study after eating.', grammar: ['～てから', 'を'], vocab: ['ご飯', '食べる', '勉強'], difficulty: 2 },
  { jp: '宿題をしてから遊びます。', en: 'I play after doing homework.', grammar: ['～てから', 'を'], vocab: ['宿題', '遊ぶ'], difficulty: 2 },
  
  // ～のが好き/上手/下手 sentences
  { jp: '音楽を聞くのが好きです。', en: 'I like listening to music.', grammar: ['～のがすきです', 'を'], vocab: ['音楽', '聞く', '好き'], difficulty: 2 },
  { jp: '日本語を話すのが上手です。', en: 'I\'m good at speaking Japanese.', grammar: ['～のがじょうずです', 'を'], vocab: ['日本語', '話す', '上手'], difficulty: 2 },
  { jp: '料理を作るのが下手です。', en: 'I\'m bad at cooking.', grammar: ['～のがへたです', 'を'], vocab: ['料理', '作る', '下手'], difficulty: 2 },
  
  // まだ～ていません sentences
  { jp: 'まだ朝ご飯を食べていません。', en: 'I haven\'t eaten breakfast yet.', grammar: ['まだ～ていません', 'を'], vocab: ['朝', 'ご飯', '食べる'], difficulty: 2 },
  { jp: 'まだ宿題をしていません。', en: 'I haven\'t done my homework yet.', grammar: ['まだ～ていません', 'を'], vocab: ['宿題'], difficulty: 2 },
  
  // Comparison sentences
  { jp: '夏のほうが冬より暑いです。', en: 'Summer is hotter than winter.', grammar: ['～のほうが～より'], vocab: ['夏', '冬', '暑い'], difficulty: 3 },
  { jp: '犬のほうが猫より大きいです。', en: 'Dogs are bigger than cats.', grammar: ['～のほうが～より'], vocab: ['犬', '猫', '大きい'], difficulty: 3 },
  
  // Superlative sentences
  { jp: '日本の中で東京が一番大きいです。', en: 'Tokyo is the biggest in Japan.', grammar: ['～のなかで～がいちばん～', 'の', 'が'], vocab: ['日本', '中', '東京', '一番', '大きい'], difficulty: 3 },
  { jp: '季節の中で春が一番好きです。', en: 'I like spring the most among the seasons.', grammar: ['～のなかで～がいちばん～', 'の', 'が'], vocab: ['季節', '中', '春', '一番', '好き'], difficulty: 3 },
  
  // ～たり sentences
  { jp: '週末は本を読んだり映画を見たりします。', en: 'On weekends, I do things like reading books and watching movies.', grammar: ['～たり…～たりする', 'は', 'を'], vocab: ['週末', '本', '読む', '映画', '見る'], difficulty: 3 },
  
  // や sentences
  { jp: 'りんごやバナナを買いました。', en: 'I bought apples, bananas, and other things.', grammar: ['や', 'を'], vocab: ['りんご', 'バナナ', '買う'], difficulty: 2 },
  
  // ～すぎる sentences
  { jp: '昨日食べすぎました。', en: 'I ate too much yesterday.', grammar: ['～すぎる'], vocab: ['昨日', '食べる'], difficulty: 2 },
  { jp: 'この部屋は暑すぎます。', en: 'This room is too hot.', grammar: ['～すぎる', 'は'], vocab: ['部屋', '暑い'], difficulty: 2 },
  
  // ～ほうがいい sentences
  { jp: '早く寝たほうがいいです。', en: 'You should sleep early.', grammar: ['～ほうがいい'], vocab: ['早く', '寝る'], difficulty: 2 },
  { jp: '医者に行ったほうがいいです。', en: 'You should go to the doctor.', grammar: ['～ほうがいい', 'に'], vocab: ['医者', '行く'], difficulty: 2 },
  
  // でしょう sentences
  { jp: '明日は雨でしょう。', en: 'It will probably rain tomorrow.', grammar: ['でしょう', 'は'], vocab: ['明日', '雨'], difficulty: 2 },
  { jp: '彼は来るでしょう。', en: 'He will probably come.', grammar: ['でしょう', 'は'], vocab: ['彼', '来る'], difficulty: 2 },
  
  // ～なくちゃいけない sentences
  { jp: '宿題をしなくちゃいけない。', en: 'I have to do my homework.', grammar: ['～なくちゃいけない', 'を'], vocab: ['宿題'], difficulty: 2 },
  { jp: '早く帰らなくちゃいけない。', en: 'I have to go home early.', grammar: ['～なくちゃいけない'], vocab: ['早く', '帰る'], difficulty: 2 },
  
  // ～んです sentences
  { jp: '今日は忙しいんです。', en: 'The thing is, I\'m busy today.', grammar: ['～んです', 'は'], vocab: ['今日', '忙しい'], difficulty: 3 },
  { jp: '頭が痛いんです。', en: 'The thing is, I have a headache.', grammar: ['～んです', 'が'], vocab: ['頭', '痛い'], difficulty: 3 },
  
  // ～く/～になる sentences
  { jp: '暖かくなりました。', en: 'It became warm.', grammar: ['～く/～になる'], vocab: ['暖かい'], difficulty: 2 },
  { jp: '日本語が上手になりました。', en: 'My Japanese became good.', grammar: ['～く/～になる', 'が'], vocab: ['日本語', '上手'], difficulty: 2 },
  
  // ないでください sentences
  { jp: '心配しないでください。', en: 'Please don\'t worry.', grammar: ['ないでください'], vocab: ['心配'], difficulty: 2 },
  { jp: '忘れないでください。', en: 'Please don\'t forget.', grammar: ['ないでください'], vocab: ['忘れる'], difficulty: 2 },
];

async function generateNaturalN5Sentences() {
  console.log('=== Generating Natural N5 Sentences ===\n');
  
  // Load existing sentences
  const existingSentences = loadExistingSentences();
  console.log(`Current total sentences: ${existingSentences.length}`);
  
  // Remove the template-generated N5 sentences (keep only the original 185 from test data)
  const originalN5 = existingSentences.filter(s => 
    s.jlpt_level === 'N5' && s.created_at < '2025-12-19T03:27:00Z'
  );
  const nonN5 = existingSentences.filter(s => s.jlpt_level !== 'N5');
  
  console.log(`Keeping ${originalN5.length} original N5 sentences from test data`);
  console.log(`Keeping ${nonN5.length} N4 sentences`);
  console.log(`Removing ${existingSentences.length - originalN5.length - nonN5.length} template-generated sentences\n`);
  
  // Convert natural sentences to database format
  const newN5Sentences = naturalSentences.map(s => {
    const kanjiUsed = (s.jp.match(/[一-龯]/g) || []);
    const uniqueKanji = [...new Set(kanjiUsed)];
    
    return {
      id: uuidv4(),
      japanese_text: s.jp,
      english_translation: s.en,
      jlpt_level: 'N5',
      difficulty_level: s.difficulty,
      grammar_points: s.grammar,
      vocabulary_used: s.vocab,
      kanji_used: uniqueKanji,
      audio_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });
  
  console.log(`Generated ${newN5Sentences.length} natural N5 sentences\n`);
  
  // Combine all sentences
  const allSentences = [...originalN5, ...newN5Sentences, ...nonN5];
  
  // Sort by level and difficulty
  allSentences.sort((a, b) => {
    const levelOrder = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };
    const levelDiff = levelOrder[a.jlpt_level] - levelOrder[b.jlpt_level];
    if (levelDiff !== 0) return levelDiff;
    return a.difficulty_level - b.difficulty_level;
  });
  
  console.log('=== SUMMARY ===');
  console.log(`Total N5 sentences: ${originalN5.length + newN5Sentences.length}`);
  console.log(`  - Original from test data: ${originalN5.length}`);
  console.log(`  - New natural sentences: ${newN5Sentences.length}`);
  console.log(`Total N4 sentences: ${nonN5.length}`);
  console.log(`Grand total: ${allSentences.length} sentences\n`);
  
  // Save to file
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  fs.writeFileSync(sentencesPath, JSON.stringify(allSentences, null, 2), 'utf8');
  console.log(`✓ Saved to: ${sentencesPath}`);
  
  // Generate coverage report
  const grammarCoverage = {};
  newN5Sentences.forEach(s => {
    s.grammar_points.forEach(g => {
      grammarCoverage[g] = (grammarCoverage[g] || 0) + 1;
    });
  });
  
  console.log('\n=== Grammar Coverage ===');
  Object.entries(grammarCoverage).sort((a, b) => b[1] - a[1]).forEach(([pattern, count]) => {
    console.log(`${pattern}: ${count} sentences`);
  });
}

generateNaturalN5Sentences().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
