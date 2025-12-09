'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, GraduationCap, ArrowRight } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

interface Particle {
  id: string;
  particle: string;
  meaning: string;
  usage: string;
  example: string;
  exampleTranslation: string;
  level: string;
  category: string;
}

// Japanese Particles Data
const particlesData: Particle[] = [
  // Topic/Subject Particles
  { id: '1', particle: 'は (wa)', meaning: 'topic marker', usage: 'Marks the topic of the sentence', example: '私は学生です。', exampleTranslation: 'I am a student.', level: 'N5', category: 'Topic/Subject' },
  { id: '2', particle: 'が (ga)', meaning: 'subject marker', usage: 'Marks the grammatical subject', example: '猫がいます。', exampleTranslation: 'There is a cat.', level: 'N5', category: 'Topic/Subject' },
  { id: '3', particle: 'も (mo)', meaning: 'also, too', usage: 'Indicates something is also true', example: '私も学生です。', exampleTranslation: 'I am also a student.', level: 'N5', category: 'Topic/Subject' },
  
  // Object Particles
  { id: '4', particle: 'を (wo/o)', meaning: 'object marker', usage: 'Marks the direct object of an action', example: '本を読みます。', exampleTranslation: 'I read a book.', level: 'N5', category: 'Object' },
  
  // Location/Direction Particles
  { id: '5', particle: 'に (ni)', meaning: 'at, in, on, to', usage: 'Indicates location, time, or destination', example: '学校に行きます。', exampleTranslation: 'I go to school.', level: 'N5', category: 'Location/Direction' },
  { id: '6', particle: 'へ (e)', meaning: 'to, towards', usage: 'Indicates direction or destination', example: '東京へ行きます。', exampleTranslation: 'I go to Tokyo.', level: 'N5', category: 'Location/Direction' },
  { id: '7', particle: 'で (de)', meaning: 'at, by, with', usage: 'Indicates location of action or means', example: '学校で勉強します。', exampleTranslation: 'I study at school.', level: 'N5', category: 'Location/Direction' },
  { id: '8', particle: 'から (kara)', meaning: 'from, since', usage: 'Indicates starting point or reason', example: '9時から始まります。', exampleTranslation: 'It starts from 9 o\'clock.', level: 'N5', category: 'Location/Direction' },
  { id: '9', particle: 'まで (made)', meaning: 'until, to', usage: 'Indicates endpoint', example: '5時まで働きます。', exampleTranslation: 'I work until 5 o\'clock.', level: 'N5', category: 'Location/Direction' },
  
  // Connective Particles
  { id: '10', particle: 'と (to)', meaning: 'and, with', usage: 'Connects nouns or indicates accompaniment', example: '友達と映画を見ます。', exampleTranslation: 'I watch a movie with a friend.', level: 'N5', category: 'Connective' },
  { id: '11', particle: 'や (ya)', meaning: 'and (non-exhaustive)', usage: 'Lists examples among other things', example: 'りんごやバナナを買いました。', exampleTranslation: 'I bought apples, bananas, and such.', level: 'N5', category: 'Connective' },
  { id: '12', particle: 'か (ka)', meaning: 'or, question marker', usage: 'Forms questions or indicates choice', example: 'コーヒーか紅茶はいかがですか。', exampleTranslation: 'Would you like coffee or tea?', level: 'N5', category: 'Connective' },
  
  // Possessive/Modifier Particles
  { id: '13', particle: 'の (no)', meaning: 'possessive, of', usage: 'Shows possession or modifies nouns', example: '私の本です。', exampleTranslation: 'It\'s my book.', level: 'N5', category: 'Possessive/Modifier' },
  
  // Emphasis/Sentence-Ending Particles
  { id: '14', particle: 'ね (ne)', meaning: 'right?, isn\'t it?', usage: 'Seeks agreement or confirmation', example: 'いい天気ですね。', exampleTranslation: 'Nice weather, isn\'t it?', level: 'N5', category: 'Emphasis/Ending' },
  { id: '15', particle: 'よ (yo)', meaning: 'emphasis, you know', usage: 'Emphasizes or informs', example: '明日は休みですよ。', exampleTranslation: 'Tomorrow is a day off, you know.', level: 'N5', category: 'Emphasis/Ending' },
  
  // Comparison Particles
  { id: '17', particle: 'より (yori)', meaning: 'than, more than', usage: 'Used in comparisons', example: '夏より冬が好きです。', exampleTranslation: 'I like winter more than summer.', level: 'N4', category: 'Comparison' },
  { id: '18', particle: 'ほど (hodo)', meaning: 'as much as, to the extent', usage: 'Indicates degree or extent', example: '彼ほど上手じゃない。', exampleTranslation: 'I\'m not as good as him.', level: 'N4', category: 'Comparison' },
  
  // Limitation Particles
  { id: '19', particle: 'だけ (dake)', meaning: 'only, just', usage: 'Indicates limitation', example: '水だけ飲みます。', exampleTranslation: 'I drink only water.', level: 'N4', category: 'Limitation' },
  { id: '20', particle: 'しか (shika)', meaning: 'only (with negative)', usage: 'Indicates limitation (used with negative)', example: '100円しかありません。', exampleTranslation: 'I only have 100 yen.', level: 'N4', category: 'Limitation' },
  { id: '21', particle: 'ばかり (bakari)', meaning: 'only, nothing but', usage: 'Indicates excessive focus', example: 'ゲームばかりしています。', exampleTranslation: 'I do nothing but play games.', level: 'N3', category: 'Limitation' },
  
  // Conditional/Reason Particles
  { id: '22', particle: 'ので (node)', meaning: 'because, since', usage: 'Indicates reason (softer than から)', example: '雨なので行きません。', exampleTranslation: 'I won\'t go because it\'s raining.', level: 'N4', category: 'Conditional/Reason' },
  { id: '23', particle: 'のに (noni)', meaning: 'although, despite', usage: 'Indicates contradiction', example: '勉強したのに、できませんでした。', exampleTranslation: 'Although I studied, I couldn\'t do it.', level: 'N4', category: 'Conditional/Reason' },
  { id: '24', particle: 'なら (nara)', meaning: 'if, in case of', usage: 'Conditional based on topic', example: '日本に行くなら、京都がいいです。', exampleTranslation: 'If you\'re going to Japan, Kyoto is good.', level: 'N4', category: 'Conditional/Reason' },
  
  // N3-N4 Particles
  { id: '25', particle: 'さえ (sae)', meaning: 'even', usage: 'Indicates extreme example', example: '子供さえ知っています。', exampleTranslation: 'Even children know it.', level: 'N3', category: 'Limitation' },
  { id: '26', particle: 'こそ (koso)', meaning: 'precisely, exactly', usage: 'Strong emphasis', example: 'これこそ私が欲しかったものです。', exampleTranslation: 'This is precisely what I wanted.', level: 'N3', category: 'Emphasis/Ending' },
  { id: '27', particle: 'まま (mama)', meaning: 'as is, unchanged', usage: 'Indicates unchanged state', example: '靴を履いたまま入りました。', exampleTranslation: 'I entered with my shoes still on.', level: 'N3', category: 'Advanced' },
  { id: '28', particle: 'きり (kiri)', meaning: 'only, just', usage: 'Indicates limitation', example: '一度きり会いました。', exampleTranslation: 'I met them only once.', level: 'N3', category: 'Limitation' },
  { id: '29', particle: 'ずつ (zutsu)', meaning: 'each, apiece', usage: 'Indicates equal distribution', example: '一つずつ取ってください。', exampleTranslation: 'Please take one each.', level: 'N3', category: 'Advanced' },
  { id: '30', particle: 'につき (nitsuki)', meaning: 'per, due to', usage: 'Indicates rate or reason (formal)', example: '一人につき1000円です。', exampleTranslation: 'It\'s 1000 yen per person.', level: 'N2', category: 'Advanced' },
  
  // Additional Common Particles
  { id: '31', particle: 'くらい/ぐらい (kurai/gurai)', meaning: 'about, approximately', usage: 'Indicates approximation', example: '2時間くらいかかります。', exampleTranslation: 'It takes about 2 hours.', level: 'N4', category: 'Comparison' },
  { id: '33', particle: 'など (nado)', meaning: 'and so on, etc.', usage: 'Lists examples', example: '本など買いました。', exampleTranslation: 'I bought books and such.', level: 'N4', category: 'Connective' },
  { id: '34', particle: 'って (tte)', meaning: 'called, quotation (casual)', usage: 'Casual quotation or topic marker', example: '田中さんって誰ですか。', exampleTranslation: 'Who is this person called Tanaka?', level: 'N4', category: 'Connective' },
  { id: '35', particle: 'とか (toka)', meaning: 'and, or something', usage: 'Lists examples (casual)', example: 'りんごとかバナナとか買いました。', exampleTranslation: 'I bought apples, bananas, and stuff like that.', level: 'N4', category: 'Connective' },
  { id: '36', particle: 'でも (demo)', meaning: 'or something, even', usage: 'Suggests an example', example: 'お茶でも飲みませんか。', exampleTranslation: 'Won\'t you have some tea or something?', level: 'N4', category: 'Connective' },
  { id: '37', particle: 'たり (tari)', meaning: 'doing things like', usage: 'Lists sample actions', example: '本を読んだり、音楽を聞いたりします。', exampleTranslation: 'I do things like reading books and listening to music.', level: 'N4', category: 'Connective' },
  { id: '38', particle: 'ながら (nagara)', meaning: 'while doing', usage: 'Simultaneous actions', example: '音楽を聞きながら勉強します。', exampleTranslation: 'I study while listening to music.', level: 'N4', category: 'Conditional/Reason' },
  { id: '40', particle: 'について (nitsuite)', meaning: 'about, concerning', usage: 'Indicates topic', example: '日本について勉強します。', exampleTranslation: 'I study about Japan.', level: 'N3', category: 'Advanced' },
  { id: '41', particle: 'において (nioite)', meaning: 'in, at (formal)', usage: 'Indicates location (formal)', example: '会議において決定されました。', exampleTranslation: 'It was decided at the meeting.', level: 'N2', category: 'Advanced' },
  { id: '42', particle: 'によって (niyotte)', meaning: 'by, depending on', usage: 'Indicates means or variation', example: '人によって意見が違います。', exampleTranslation: 'Opinions differ depending on the person.', level: 'N3', category: 'Advanced' },
  { id: '43', particle: 'による (niyoru)', meaning: 'according to, by', usage: 'Indicates source or cause', example: 'ニュースによる情報です。', exampleTranslation: 'It\'s information according to the news.', level: 'N3', category: 'Advanced' },
  { id: '44', particle: 'として (toshite)', meaning: 'as, in the role of', usage: 'Indicates capacity or role', example: '先生として働いています。', exampleTranslation: 'I work as a teacher.', level: 'N3', category: 'Advanced' },
  { id: '45', particle: 'とともに (totomoni)', meaning: 'together with, as', usage: 'Indicates accompaniment or progression', example: '時間とともに良くなります。', exampleTranslation: 'It gets better with time.', level: 'N2', category: 'Advanced' },
  { id: '46', particle: 'に対して (nitaishite)', meaning: 'towards, against', usage: 'Indicates direction or opposition', example: '先生に対して質問します。', exampleTranslation: 'I ask a question to the teacher.', level: 'N2', category: 'Advanced' },
  { id: '47', particle: 'に関して (nikanshite)', meaning: 'regarding, concerning', usage: 'Indicates topic', example: 'この問題に関して話します。', exampleTranslation: 'I\'ll talk regarding this problem.', level: 'N2', category: 'Advanced' },
  { id: '49', particle: 'わ (wa)', meaning: 'emphasis (feminine)', usage: 'Feminine sentence ending for emphasis', example: 'きれいだわ。', exampleTranslation: 'It\'s beautiful!', level: 'N4', category: 'Emphasis/Ending' },
  { id: '50', particle: 'ぞ (zo)', meaning: 'emphasis (masculine)', usage: 'Masculine sentence ending for emphasis', example: '行くぞ。', exampleTranslation: 'Let\'s go!', level: 'N4', category: 'Emphasis/Ending' },
  { id: '51', particle: 'ぜ (ze)', meaning: 'emphasis (masculine)', usage: 'Masculine sentence ending for emphasis', example: 'すごいぜ。', exampleTranslation: 'That\'s amazing!', level: 'N4', category: 'Emphasis/Ending' },
  { id: '52', particle: 'な (na)', meaning: 'prohibition, emphasis', usage: 'Prohibitive or emphatic ending', example: '行くな。', exampleTranslation: 'Don\'t go!', level: 'N4', category: 'Emphasis/Ending' },
  { id: '53', particle: 'さ (sa)', meaning: 'emphasis, you know', usage: 'Casual emphasis', example: 'いいさ。', exampleTranslation: 'It\'s fine, you know.', level: 'N4', category: 'Emphasis/Ending' },
  { id: '54', particle: 'っけ (kke)', meaning: 'I wonder, was it?', usage: 'Recalls information', example: '何時だっけ。', exampleTranslation: 'What time was it again?', level: 'N3', category: 'Emphasis/Ending' },
  { id: '55', particle: 'かい (kai)', meaning: 'question (masculine)', usage: 'Masculine question marker', example: '行くかい。', exampleTranslation: 'Are you going?', level: 'N4', category: 'Emphasis/Ending' },
  { id: '56', particle: 'だい (dai)', meaning: 'question (masculine)', usage: 'Masculine question marker', example: '何だい。', exampleTranslation: 'What is it?', level: 'N4', category: 'Emphasis/Ending' },
  { id: '57', particle: 'かしら (kashira)', meaning: 'I wonder (feminine)', usage: 'Feminine wondering', example: '来るかしら。', exampleTranslation: 'I wonder if they\'ll come.', level: 'N3', category: 'Emphasis/Ending' },
  { id: '58', particle: 'かな (kana)', meaning: 'I wonder', usage: 'Wondering or uncertainty', example: '大丈夫かな。', exampleTranslation: 'I wonder if it\'s okay.', level: 'N4', category: 'Emphasis/Ending' },
  { id: '60', particle: 'たって (tatte)', meaning: 'even if, no matter', usage: 'Concessive', example: '頑張ったって無理です。', exampleTranslation: 'Even if I try hard, it\'s impossible.', level: 'N3', category: 'Conditional/Reason' },
  { id: '61', particle: 'ては/では (te wa/de wa)', meaning: 'if, when (conditional)', usage: 'Conditional with negative result', example: '遅れては困ります。', exampleTranslation: 'It would be troublesome if you\'re late.', level: 'N4', category: 'Conditional/Reason' },
  { id: '62', particle: 'とは (to wa)', meaning: 'what is called, means', usage: 'Defines or explains', example: '愛とは何ですか。', exampleTranslation: 'What is love?', level: 'N3', category: 'Advanced' },
  { id: '63', particle: 'ものの (mono no)', meaning: 'although, but', usage: 'Indicates contradiction', example: '行きたいものの、時間がない。', exampleTranslation: 'Although I want to go, I don\'t have time.', level: 'N3', category: 'Conditional/Reason' },
  { id: '64', particle: 'ところ (tokoro)', meaning: 'just about to, in the process', usage: 'Indicates timing of action', example: '今出かけるところです。', exampleTranslation: 'I\'m just about to leave.', level: 'N3', category: 'Advanced' },
  { id: '65', particle: 'にしては (nishite wa)', meaning: 'for, considering', usage: 'Indicates unexpectedness', example: '子供にしては上手です。', exampleTranslation: 'They\'re good for a child.', level: 'N2', category: 'Comparison' },
  { id: '66', particle: 'にとって (nitotte)', meaning: 'for, to', usage: 'Indicates perspective', example: '私にとって大切です。', exampleTranslation: 'It\'s important to me.', level: 'N3', category: 'Advanced' },
  
  // Additional N5 Particles
  { id: '91', particle: 'けど (kedo)', meaning: 'but, however', usage: 'Casual conjunction', example: '行きたいけど、時間がない。', exampleTranslation: 'I want to go, but I don\'t have time.', level: 'N5', category: 'Connective' },
  { id: '92', particle: 'けれども (keredomo)', meaning: 'but, however', usage: 'Formal conjunction', example: '高いけれども、買います。', exampleTranslation: 'It\'s expensive, but I\'ll buy it.', level: 'N5', category: 'Connective' },
  { id: '93', particle: 'だ (da)', meaning: 'copula (plain)', usage: 'Plain form of です', example: '学生だ。', exampleTranslation: 'I\'m a student.', level: 'N5', category: 'Topic/Subject' },
  { id: '94', particle: 'です (desu)', meaning: 'copula (polite)', usage: 'Polite form of だ', example: '学生です。', exampleTranslation: 'I\'m a student.', level: 'N5', category: 'Topic/Subject' },
  { id: '95', particle: 'なあ (naa)', meaning: 'sentence ending', usage: 'Expresses emotion or reflection', example: 'いい天気だなあ。', exampleTranslation: 'What nice weather!', level: 'N5', category: 'Emphasis/Ending' },
  { id: '96', particle: 'んです (ndesu)', meaning: 'explanatory', usage: 'Seeks or gives explanation', example: '何をしているんですか。', exampleTranslation: 'What are you doing (I wonder)?', level: 'N5', category: 'Emphasis/Ending' },
  { id: '97', particle: 'のです (no desu)', meaning: 'explanatory', usage: 'Formal explanatory', example: '遅れたのです。', exampleTranslation: 'The thing is, I was late.', level: 'N5', category: 'Emphasis/Ending' },
  { id: '98', particle: 'お/ご (o/go)', meaning: 'honorific prefix', usage: 'Makes words polite', example: 'お茶、ご飯', exampleTranslation: 'tea, rice (polite)', level: 'N5', category: 'Possessive/Modifier' },
  
  // Additional N4 Particles
  { id: '99', particle: 'し (shi)', meaning: 'and, what\'s more', usage: 'Lists reasons', example: '安いし、おいしいし、最高です。', exampleTranslation: 'It\'s cheap, delicious, and the best.', level: 'N4', category: 'Connective' },
  { id: '100', particle: 'も (mo)', meaning: 'as many as', usage: 'Emphasizes large quantity', example: '10個も買いました。', exampleTranslation: 'I bought as many as 10!', level: 'N4', category: 'Emphasis/Ending' },
  { id: '101', particle: 'のは～だ (nowa~da)', meaning: 'the one who/that', usage: 'Emphasizes subject', example: '好きなのは寿司だ。', exampleTranslation: 'What I like is sushi.', level: 'N4', category: 'Emphasis/Ending' },
  
  // Additional N3 Particles
  { id: '102', particle: 'くせに (kuse ni)', meaning: 'even though, despite', usage: 'Criticizes despite condition', example: '子供のくせに生意気だ。', exampleTranslation: 'Even though you\'re a child, you\'re cheeky.', level: 'N3', category: 'Conditional/Reason' },
  { id: '103', particle: 'わけ (wake)', meaning: 'reason, meaning', usage: 'Indicates reason or conclusion', example: 'そういうわけで来ました。', exampleTranslation: 'That\'s why I came.', level: 'N3', category: 'Conditional/Reason' },
  { id: '104', particle: 'うえに (ue ni)', meaning: 'on top of, in addition', usage: 'Adds additional information', example: '安いうえに美味しい。', exampleTranslation: 'It\'s cheap and on top of that, delicious.', level: 'N3', category: 'Connective' },
  { id: '105', particle: 'あげく (ageku)', meaning: 'in the end, after all', usage: 'After much trouble (negative)', example: '悩んだあげく、辞めました。', exampleTranslation: 'After much worrying, I quit.', level: 'N3', category: 'Conditional/Reason' },
  { id: '106', particle: 'かわりに (kawari ni)', meaning: 'instead of', usage: 'Indicates substitution', example: '私のかわりに行ってください。', exampleTranslation: 'Please go instead of me.', level: 'N3', category: 'Advanced' },
  { id: '107', particle: 'おかげで (okage de)', meaning: 'thanks to', usage: 'Positive result from cause', example: 'あなたのおかげで成功しました。', exampleTranslation: 'Thanks to you, I succeeded.', level: 'N3', category: 'Conditional/Reason' },
  { id: '108', particle: 'せいで (sei de)', meaning: 'because of (negative)', usage: 'Negative result from cause', example: '雨のせいで遅れた。', exampleTranslation: 'I was late because of the rain.', level: 'N3', category: 'Conditional/Reason' },
  { id: '109', particle: 'こと (koto)', meaning: 'must do', usage: 'Strong command or rule', example: '毎日勉強すること。', exampleTranslation: 'You must study every day.', level: 'N3', category: 'Emphasis/Ending' },
  { id: '110', particle: 'から～にかけて (kara~ni kakete)', meaning: 'from ~ to ~', usage: 'Indicates range', example: '夜から朝にかけて雨が降る。', exampleTranslation: 'It will rain from night to morning.', level: 'N3', category: 'Location/Direction' },
  { id: '111', particle: 'ながらも (nagara mo)', meaning: 'while, although', usage: 'Indicates contradiction', example: '知りながらも言わなかった。', exampleTranslation: 'Although I knew, I didn\'t say anything.', level: 'N3', category: 'Conditional/Reason' },
  { id: '112', particle: 'なんか/なんて (nanka/nante)', meaning: 'things like, such as', usage: 'Casual listing or emphasis', example: '私なんか無理です。', exampleTranslation: 'Someone like me can\'t do it.', level: 'N3', category: 'Connective' },
  { id: '113', particle: 'にしても (ni shite mo)', meaning: 'even if, even though', usage: 'Regardless of condition', example: '冗談にしてもひどい。', exampleTranslation: 'Even if it\'s a joke, that\'s terrible.', level: 'N3', category: 'Conditional/Reason' },
  { id: '114', particle: 'には (ni wa)', meaning: 'for, in order to', usage: 'Indicates purpose or requirement', example: '合格するには勉強が必要だ。', exampleTranslation: 'In order to pass, studying is necessary.', level: 'N3', category: 'Advanced' },
  { id: '115', particle: 'しかない (shika nai)', meaning: 'have no choice but', usage: 'Only option remaining', example: 'やるしかない。', exampleTranslation: 'I have no choice but to do it.', level: 'N3', category: 'Limitation' },
  { id: '116', particle: 'も～ば～も (mo~ba~mo)', meaning: 'both ~ and ~', usage: 'Lists multiple items', example: '魚も食べれば肉も食べる。', exampleTranslation: 'I eat both fish and meat.', level: 'N3', category: 'Connective' },
  { id: '117', particle: 'もしも～たら (moshimo~tara)', meaning: 'if by any chance', usage: 'Hypothetical condition', example: 'もしも雨が降ったら中止です。', exampleTranslation: 'If by any chance it rains, it\'s cancelled.', level: 'N3', category: 'Conditional/Reason' },
  { id: '118', particle: 'さえ～ば (sae~ba)', meaning: 'if only, as long as', usage: 'Sufficient condition', example: '頑張りさえすれば大丈夫。', exampleTranslation: 'As long as you try hard, it\'ll be fine.', level: 'N3', category: 'Conditional/Reason' },
  
  // Additional N2 Particles
  { id: '119', particle: 'にて (nite)', meaning: 'at, in (formal)', usage: 'Formal location marker', example: '会場にて開催します。', exampleTranslation: 'We will hold it at the venue.', level: 'N2', category: 'Location/Direction' },
  { id: '120', particle: 'のみ (nomi)', meaning: 'only', usage: 'Formal limitation', example: '会員のみ入場可能。', exampleTranslation: 'Only members can enter.', level: 'N2', category: 'Limitation' },
  { id: '121', particle: 'もの/もん (mono/mon)', meaning: 'because, you know', usage: 'Gives reason (casual)', example: '行けないもの。', exampleTranslation: 'I can\'t go, you know.', level: 'N2', category: 'Conditional/Reason' },
  { id: '122', particle: 'ものの (monono)', meaning: 'although, but', usage: 'Indicates contradiction', example: '行きたいものの、時間がない。', exampleTranslation: 'Although I want to go, I don\'t have time.', level: 'N2', category: 'Conditional/Reason' },
  { id: '123', particle: 'ものか/もんか (monoka/monka)', meaning: 'no way, as if', usage: 'Strong denial', example: '負けるものか。', exampleTranslation: 'No way I\'ll lose!', level: 'N2', category: 'Emphasis/Ending' },
  { id: '124', particle: 'か～ないかのうちに (ka~nai ka no uchi ni)', meaning: 'just as, no sooner than', usage: 'Immediate succession', example: '座るか座らないかのうちに寝た。', exampleTranslation: 'No sooner had I sat down than I fell asleep.', level: 'N2', category: 'Conditional/Reason' },
  
  // N1 Particles
  { id: '67', particle: 'をもって (wo motte)', meaning: 'with, by means of', usage: 'Formal means or time limit', example: '本日をもって閉店します。', exampleTranslation: 'We will close as of today.', level: 'N1', category: 'Advanced' },
  { id: '68', particle: 'をめぐって (wo megutte)', meaning: 'concerning, regarding', usage: 'Indicates dispute or discussion topic', example: '問題をめぐって議論した。', exampleTranslation: 'We debated concerning the problem.', level: 'N1', category: 'Advanced' },
  { id: '69', particle: 'に先立って (ni sakidatte)', meaning: 'prior to, before', usage: 'Formal "before"', example: '会議に先立って資料を配布します。', exampleTranslation: 'We will distribute materials prior to the meeting.', level: 'N1', category: 'Advanced' },
  { id: '70', particle: 'にあたって (ni atatte)', meaning: 'on the occasion of', usage: 'Formal occasion marker', example: '開会にあたって挨拶します。', exampleTranslation: 'I will give a greeting on the occasion of opening.', level: 'N1', category: 'Advanced' },
  { id: '71', particle: 'に際して (ni saishite)', meaning: 'on the occasion of, when', usage: 'Formal occasion or timing', example: '出発に際して注意事項を確認してください。', exampleTranslation: 'Please confirm precautions when departing.', level: 'N1', category: 'Advanced' },
  { id: '72', particle: 'をはじめ (wo hajime)', meaning: 'starting with, including', usage: 'Lists representative examples', example: '東京をはじめ、多くの都市で開催されます。', exampleTranslation: 'It will be held in many cities, starting with Tokyo.', level: 'N1', category: 'Connective' },
  { id: '73', particle: 'をめぐる (wo meguru)', meaning: 'concerning, surrounding', usage: 'Indicates topic of dispute', example: '環境問題をめぐる議論。', exampleTranslation: 'Debate surrounding environmental issues.', level: 'N1', category: 'Advanced' },
  { id: '74', particle: 'に基づいて (ni motozuite)', meaning: 'based on', usage: 'Indicates basis or foundation', example: '法律に基づいて判断します。', exampleTranslation: 'We will judge based on the law.', level: 'N1', category: 'Advanced' },
  { id: '75', particle: 'にかけて (ni kakete)', meaning: 'over, through', usage: 'Indicates range or extent', example: '夜から朝にかけて雨が降ります。', exampleTranslation: 'It will rain from night through morning.', level: 'N1', category: 'Location/Direction' },
  { id: '76', particle: 'にわたって (ni watatte)', meaning: 'over, throughout', usage: 'Indicates duration or range', example: '3年にわたって研究しました。', exampleTranslation: 'I researched over 3 years.', level: 'N1', category: 'Advanced' },
  { id: '77', particle: 'を通じて (wo tsūjite)', meaning: 'through, via', usage: 'Indicates means or duration', example: '一年を通じて暖かい。', exampleTranslation: 'It\'s warm throughout the year.', level: 'N1', category: 'Advanced' },
  { id: '78', particle: 'を通して (wo tōshite)', meaning: 'through, throughout', usage: 'Indicates means or medium', example: '経験を通して学びました。', exampleTranslation: 'I learned through experience.', level: 'N1', category: 'Advanced' },
  { id: '79', particle: 'にかかわらず (ni kakawarazu)', meaning: 'regardless of', usage: 'Indicates irrelevance', example: '天気にかかわらず開催します。', exampleTranslation: 'We will hold it regardless of weather.', level: 'N1', category: 'Conditional/Reason' },
  { id: '80', particle: 'をはじめとして (wo hajime toshite)', meaning: 'starting with, including', usage: 'Lists representative items', example: '日本をはじめとするアジア諸国。', exampleTranslation: 'Asian countries including Japan.', level: 'N1', category: 'Connective' },
  { id: '81', particle: 'をきっかけに (wo kikkake ni)', meaning: 'triggered by, as a result of', usage: 'Indicates trigger or opportunity', example: '事故をきっかけに安全対策を強化した。', exampleTranslation: 'We strengthened safety measures triggered by the accident.', level: 'N1', category: 'Conditional/Reason' },
  { id: '82', particle: 'に伴って (ni tomonatte)', meaning: 'along with, as', usage: 'Indicates accompaniment or consequence', example: '経済発展に伴って環境問題が増えた。', exampleTranslation: 'Environmental problems increased along with economic development.', level: 'N1', category: 'Conditional/Reason' },
  { id: '83', particle: 'につれて (ni tsurete)', meaning: 'as, in proportion to', usage: 'Indicates proportional change', example: '年を取るにつれて忘れっぽくなる。', exampleTranslation: 'As you age, you become more forgetful.', level: 'N1', category: 'Conditional/Reason' },
  { id: '84', particle: 'に応じて (ni ōjite)', meaning: 'according to, depending on', usage: 'Indicates correspondence', example: '能力に応じて給料が決まります。', exampleTranslation: 'Salary is determined according to ability.', level: 'N1', category: 'Advanced' },
  { id: '85', particle: 'に反して (ni hanshite)', meaning: 'contrary to, against', usage: 'Indicates opposition', example: '予想に反して失敗した。', exampleTranslation: 'Contrary to expectations, it failed.', level: 'N1', category: 'Conditional/Reason' },
  { id: '86', particle: 'にもかかわらず (ni mo kakawarazu)', meaning: 'despite, in spite of', usage: 'Strong contradiction', example: '努力したにもかかわらず失敗した。', exampleTranslation: 'Despite my efforts, I failed.', level: 'N1', category: 'Conditional/Reason' },
  { id: '87', particle: 'ばかりか (bakari ka)', meaning: 'not only, let alone', usage: 'Emphasizes addition', example: '英語ばかりか中国語も話せる。', exampleTranslation: 'I can speak not only English but also Chinese.', level: 'N1', category: 'Connective' },
  { id: '88', particle: 'はもちろん (wa mochiron)', meaning: 'not to mention, of course', usage: 'Emphasizes inclusion', example: '日本語はもちろん英語も話せます。', exampleTranslation: 'I can speak English, not to mention Japanese.', level: 'N1', category: 'Connective' },
  { id: '89', particle: 'はおろか (wa oroka)', meaning: 'let alone, not to mention', usage: 'Emphasizes extreme case', example: '漢字はおろかひらがなも読めない。', exampleTranslation: 'I can\'t read hiragana, let alone kanji.', level: 'N1', category: 'Connective' },
  { id: '90', particle: 'どころか (dokoro ka)', meaning: 'far from, let alone', usage: 'Indicates opposite extreme', example: '楽しいどころか苦痛だった。', exampleTranslation: 'Far from enjoyable, it was painful.', level: 'N1', category: 'Comparison' },
  { id: '125', particle: 'に (ni)', meaning: 'and, in addition', usage: 'Adds information (formal)', example: '美しいに違いない。', exampleTranslation: 'It must be beautiful.', level: 'N1', category: 'Connective' },
  { id: '126', particle: 'さ (sa)', meaning: 'emphasis (masculine)', usage: 'Masculine emphasis', example: 'そうさ。', exampleTranslation: 'That\'s right!', level: 'N1', category: 'Emphasis/Ending' },
  { id: '127', particle: 'もので (mono de)', meaning: 'because, since', usage: 'Gives reason (formal)', example: '急いでいたもので失礼しました。', exampleTranslation: 'I was in a hurry, so I apologize.', level: 'N1', category: 'Conditional/Reason' },
  { id: '128', particle: 'のやら～のやら (no yara~no yara)', meaning: 'whether ~ or ~', usage: 'Uncertainty about alternatives', example: '行くのやら行かないのやら。', exampleTranslation: 'Whether they\'ll go or not...', level: 'N1', category: 'Conditional/Reason' },
  { id: '129', particle: 'こそあれ (koso are)', meaning: 'although, even though', usage: 'Formal concession', example: '遅いこそあれ、来ないことはない。', exampleTranslation: 'Although late, they will come.', level: 'N1', category: 'Conditional/Reason' },
  { id: '130', particle: 'こそすれ (koso sure)', meaning: 'far from, let alone', usage: 'Emphasizes opposite', example: '減りこそすれ増えはしない。', exampleTranslation: 'Far from increasing, it\'s decreasing.', level: 'N1', category: 'Comparison' },
  { id: '131', particle: 'こそ～が/けれど (koso~ga/keredo)', meaning: 'although, but', usage: 'Formal contradiction', example: '努力はしたこそすれ、成功しなかった。', exampleTranslation: 'Although I made efforts, I didn\'t succeed.', level: 'N1', category: 'Conditional/Reason' },
  { id: '132', particle: 'なり (nari)', meaning: 'or, whether', usage: 'Presents alternatives', example: '電話なりメールなりで連絡してください。', exampleTranslation: 'Please contact me by phone or email.', level: 'N1', category: 'Connective' },
  { id: '133', particle: 'なりとも (nari tomo)', meaning: 'even, at least', usage: 'Minimum amount', example: '一日なりとも休みたい。', exampleTranslation: 'I want to rest even just one day.', level: 'N1', category: 'Limitation' },
  { id: '134', particle: 'なり～なり (nari~nari)', meaning: 'either ~ or ~', usage: 'Presents choices', example: '行くなり帰るなり決めてください。', exampleTranslation: 'Please decide whether to go or return.', level: 'N1', category: 'Connective' },
  { id: '135', particle: 'すら/ですら (sura/de sura)', meaning: 'even', usage: 'Emphasizes extreme example', example: '名前すら知らない。', exampleTranslation: 'I don\'t even know their name.', level: 'N1', category: 'Limitation' },
  { id: '136', particle: 'いくら～ても (ikura~temo)', meaning: 'no matter how much', usage: 'Emphasizes futility', example: 'いくら頑張っても無理だ。', exampleTranslation: 'No matter how hard I try, it\'s impossible.', level: 'N1', category: 'Conditional/Reason' },
];

export default function ParticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const levels = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];
  const categories = ['All', 'Topic/Subject', 'Object', 'Location/Direction', 'Connective', 'Possessive/Modifier', 'Emphasis/Ending', 'Comparison', 'Limitation', 'Conditional/Reason', 'Advanced'];

  const filteredParticles = particlesData.filter(p => {
    const matchesSearch = p.particle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.usage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || p.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // SEO metadata
  const pageTitle = 'Japanese Particles Guide - Complete Reference | Rocket JLPT';
  const pageDescription = 'Master Japanese particles (助詞) with comprehensive examples and explanations. Learn は, が, を, に, で, and more for all JLPT levels.';
  const pageUrl = 'https://rocketjlpt.com/jlpt/particles';

  // Structured data for SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "name": "Japanese Particles Reference",
      "description": pageDescription,
      "provider": {
        "@type": "Organization",
        "name": "Rocket JLPT",
        "url": "https://rocketjlpt.com"
      },
      "inLanguage": "ja",
      "about": {
        "@type": "Thing",
        "name": "Japanese Particles"
      },
      "url": pageUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://rocketjlpt.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Japanese Particles",
          "item": pageUrl
        }
      ]
    }
  ];

  useEffect(() => {
    // Set document title and meta tags
    document.title = pageTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', 'Japanese particles, は, が, を, に, で, JLPT particles, Japanese grammar, particle guide, 助詞');
    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    // Add structured data
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
    oldScripts.forEach(s => s.remove());
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-gray-900">Japanese Particles</span>
              </div>
              
              {/* Title with gradient accent */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Japanese Particles
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                    {particlesData.length} particles
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  Complete guide to Japanese particles (助詞) with meanings, usage, and examples
                </p>
              </div>

              {/* Search Bar and Practice Button */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search particles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                  />
                </div>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-all whitespace-nowrap"
                >
                  <GraduationCap className="h-5 w-5" />
                  Practice Particles
                </Link>
              </div>
            </div>

            {/* Progress Meter - Desktop Only */}
            <div className="hidden xl:flex flex-col items-center gap-4">
              <div className="relative w-44 h-44">
                {/* Background circles */}
                <svg className="w-44 h-44 transform -rotate-90">
                  {/* Background segments */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <circle
                      key={`bg-${i}`}
                      cx="88"
                      cy="88"
                      r="76"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeDasharray="59.69 417.83"
                      strokeDashoffset={-i * 59.69}
                      strokeLinecap="round"
                    />
                  ))}
                  {/* Progress segments - showing 0% */}
                  {[0, 1, 2].map((i) => (
                    <circle
                      key={`progress-${i}`}
                      cx="88"
                      cy="88"
                      r="76"
                      fill="none"
                      stroke={i < 2 ? "#ec4899" : "#f97316"}
                      strokeWidth="16"
                      strokeDasharray="59.69 417.83"
                      strokeDashoffset={-i * 59.69}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  ))}
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">0%</span>
                </div>
              </div>
              <Link 
                href="/login"
                className="text-sm text-gray-600 hover:text-pink-600 transition-colors font-medium"
              >
                Login to track progress
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JLPT Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLevel === level
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Particles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParticles.map((particle) => (
            <div
              key={particle.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-200 p-6 group"
            >
              {/* Particle with gradient background */}
              <div className="mb-4 pb-3 border-b border-gray-100">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-50 to-orange-50 rounded-md mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 font-japanese">
                    {particle.particle}
                  </h3>
                </div>
                <p className="text-sm text-pink-600 font-medium">
                  {particle.meaning}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                    {particle.level}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {particle.category}
                  </span>
                </div>
              </div>

              {/* Usage */}
              <p className="text-sm text-gray-600 mb-4">
                {particle.usage}
              </p>

              {/* Example */}
              <div className="bg-gradient-to-br from-gray-50 to-pink-50/30 rounded-lg p-3 border border-gray-100">
                <p className="text-base text-gray-900 mb-1 font-japanese">
                  {particle.example}
                </p>
                <p className="text-xs text-gray-500">
                  {particle.exampleTranslation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredParticles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No particles found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Master Japanese particles
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Practice with interactive exercises and track your progress across all JLPT levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all shadow-sm"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
