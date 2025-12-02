'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, Search } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

interface GrammarPoint {
  id: string;
  pattern: string;
  meaning: string;
  usage: string;
  example: string;
  exampleTranslation: string;
}

// N5 Grammar Data
const n5Grammar: GrammarPoint[] = [
  { id: '1', pattern: 'です', meaning: 'to be (polite)', usage: 'Used to state something politely', example: '私は学生です。', exampleTranslation: 'I am a student.' },
  { id: '2', pattern: 'も', meaning: 'also, too', usage: 'Indicates something is also true', example: '私も学生です。', exampleTranslation: 'I am also a student.' },
  { id: '3', pattern: 'で', meaning: 'at, by, with', usage: 'Indicates location or means', example: '学校で勉強します。', exampleTranslation: 'I study at school.' },
  { id: '4', pattern: 'に/へ', meaning: 'to, towards', usage: 'Indicates direction or destination', example: '学校に行きます。', exampleTranslation: 'I go to school.' },
  { id: '5', pattern: 'に', meaning: 'at, on, in (time)', usage: 'Indicates specific time', example: '7時に起きます。', exampleTranslation: 'I wake up at 7 o\'clock.' },
  { id: '6', pattern: 'を', meaning: 'object marker', usage: 'Marks the direct object', example: '本を読みます。', exampleTranslation: 'I read a book.' },
  { id: '7', pattern: '～ませんか', meaning: 'won\'t you...?', usage: 'Polite invitation', example: '一緒に行きませんか。', exampleTranslation: 'Won\'t you go together?' },
  { id: '8', pattern: 'は', meaning: 'topic marker', usage: 'Marks the topic of sentence', example: '私は田中です。', exampleTranslation: 'As for me, I\'m Tanaka.' },
  { id: '9', pattern: '～があります', meaning: 'there is (inanimate)', usage: 'Existence of things', example: '机の上に本があります。', exampleTranslation: 'There is a book on the desk.' },
  { id: '10', pattern: '～がいます', meaning: 'there is (animate)', usage: 'Existence of people/animals', example: '部屋に人がいます。', exampleTranslation: 'There is a person in the room.' },
  { id: '11', pattern: 'と', meaning: 'and, with', usage: 'Connects nouns or indicates accompaniment', example: '友達と映画を見ます。', exampleTranslation: 'I watch a movie with a friend.' },
  { id: '12', pattern: '～ましょう', meaning: 'let\'s...', usage: 'Suggestion or invitation', example: '一緒に食べましょう。', exampleTranslation: 'Let\'s eat together.' },
  { id: '13', pattern: '～ましょうか', meaning: 'shall we...?', usage: 'Polite suggestion', example: '休みましょうか。', exampleTranslation: 'Shall we rest?' },
  { id: '14', pattern: '～てください', meaning: 'please do...', usage: 'Polite request', example: '待ってください。', exampleTranslation: 'Please wait.' },
  { id: '15', pattern: '～てもいいです', meaning: 'it\'s okay to...', usage: 'Permission', example: '入ってもいいです。', exampleTranslation: 'It\'s okay to enter.' },
  { id: '16', pattern: '～てはいけません', meaning: 'must not...', usage: 'Prohibition', example: 'ここで食べてはいけません。', exampleTranslation: 'You must not eat here.' },
  { id: '17', pattern: '～から', meaning: 'because, from', usage: 'Indicates reason or starting point', example: '忙しいから行けません。', exampleTranslation: 'I can\'t go because I\'m busy.' },
  { id: '18', pattern: '～ている', meaning: 'is doing, is in a state', usage: 'Progressive or state', example: '今、勉強しています。', exampleTranslation: 'I am studying now.' },
  { id: '19', pattern: '～にいく', meaning: 'go to do...', usage: 'Purpose of going', example: '買い物に行きます。', exampleTranslation: 'I go shopping.' },
  { id: '20', pattern: 'ないでください', meaning: 'please don\'t...', usage: 'Negative request', example: '心配しないでください。', exampleTranslation: 'Please don\'t worry.' },
  { id: '21', pattern: '～のがすきです', meaning: 'like doing...', usage: 'Express preference', example: '音楽を聞くのが好きです。', exampleTranslation: 'I like listening to music.' },
  { id: '22', pattern: '～のがじょうずです', meaning: 'good at...', usage: 'Express skill', example: '日本語を話すのが上手です。', exampleTranslation: 'I\'m good at speaking Japanese.' },
  { id: '23', pattern: '～のがへたです', meaning: 'bad at...', usage: 'Express lack of skill', example: '料理を作るのが下手です。', exampleTranslation: 'I\'m bad at cooking.' },
  { id: '24', pattern: 'まだ～ていません', meaning: 'not yet...', usage: 'Something hasn\'t happened yet', example: 'まだ食べていません。', exampleTranslation: 'I haven\'t eaten yet.' },
  { id: '25', pattern: '～のほうが～より', meaning: '... is more than...', usage: 'Comparison', example: '夏のほうが冬より好きです。', exampleTranslation: 'I like summer more than winter.' },
  { id: '26', pattern: '～のなかで～がいちばん～', meaning: '... is the most...', usage: 'Superlative', example: '日本の中で東京が一番大きいです。', exampleTranslation: 'Tokyo is the biggest in Japan.' },
  { id: '27', pattern: 'つもりです', meaning: 'intend to...', usage: 'Express intention', example: '明日行くつもりです。', exampleTranslation: 'I intend to go tomorrow.' },
  { id: '28', pattern: '～く/～になる', meaning: 'become...', usage: 'Change of state', example: '暖かくなりました。', exampleTranslation: 'It became warm.' },
  { id: '29', pattern: 'stem +たいです', meaning: 'want to...', usage: 'Express desire', example: '日本に行きたいです。', exampleTranslation: 'I want to go to Japan.' },
  { id: '30', pattern: '～たり…～たりする', meaning: 'do things like... and...', usage: 'List activities', example: '本を読んだり、音楽を聞いたりします。', exampleTranslation: 'I do things like reading books and listening to music.' },
  { id: '31', pattern: '～たことがある', meaning: 'have done... before', usage: 'Past experience', example: '日本に行ったことがあります。', exampleTranslation: 'I have been to Japan before.' },
  { id: '32', pattern: 'や', meaning: 'and (non-exhaustive)', usage: 'List examples', example: 'りんごやバナナを買いました。', exampleTranslation: 'I bought apples, bananas, and such.' },
  { id: '33', pattern: '～んです', meaning: 'explanatory tone', usage: 'Explain or emphasize', example: '忙しいんです。', exampleTranslation: 'The thing is, I\'m busy.' },
  { id: '34', pattern: '～すぎる', meaning: 'too much...', usage: 'Excessive degree', example: '食べすぎました。', exampleTranslation: 'I ate too much.' },
  { id: '35', pattern: '～ほうがいい', meaning: 'it\'s better to...', usage: 'Give advice', example: '早く寝たほうがいいです。', exampleTranslation: 'It\'s better to sleep early.' },
  { id: '36', pattern: 'ので', meaning: 'because, since', usage: 'Reason (softer than から)', example: '雨なので行きません。', exampleTranslation: 'I won\'t go because it\'s raining.' },
  { id: '37', pattern: '～なくちゃいけない', meaning: 'must...', usage: 'Obligation (casual)', example: '宿題をしなくちゃいけない。', exampleTranslation: 'I must do homework.' },
  { id: '38', pattern: 'でしょう', meaning: 'probably, right?', usage: 'Conjecture or confirmation', example: '明日は晴れるでしょう。', exampleTranslation: 'It will probably be sunny tomorrow.' },
  { id: '39', pattern: '～まえに', meaning: 'before...', usage: 'Time sequence', example: '寝る前に歯を磨きます。', exampleTranslation: 'I brush my teeth before sleeping.' },
  { id: '40', pattern: '～てから', meaning: 'after...', usage: 'Time sequence', example: '食べてから行きます。', exampleTranslation: 'I\'ll go after eating.' },
];

// N4 Grammar Data
const n4Grammar: GrammarPoint[] = [
  { id: '1', pattern: '～し', meaning: 'and what\'s more', usage: 'List reasons or qualities', example: '安いし、おいしいし、最高です。', exampleTranslation: 'It\'s cheap, delicious, and the best.' },
  { id: '2', pattern: 'そうです', meaning: 'looks like, seems', usage: 'Appearance or hearsay', example: '雨が降りそうです。', exampleTranslation: 'It looks like it will rain.' },
  { id: '3', pattern: 'てみる', meaning: 'try doing', usage: 'Try something out', example: '食べてみます。', exampleTranslation: 'I\'ll try eating it.' },
  { id: '4', pattern: 'なら', meaning: 'if, in case of', usage: 'Conditional (topic-based)', example: '日本に行くなら、京都がいいです。', exampleTranslation: 'If you\'re going to Japan, Kyoto is good.' },
  { id: '5', pattern: '(period)に(frequency)', meaning: 'frequency per period', usage: 'Express frequency', example: '一週間に三回行きます。', exampleTranslation: 'I go three times a week.' },
  { id: '6', pattern: '～がほしい', meaning: 'want (object)', usage: 'Desire for things', example: '新しい車がほしいです。', exampleTranslation: 'I want a new car.' },
  { id: '7', pattern: '～たがる', meaning: 'want to (third person)', usage: 'Others\' desires', example: '彼は行きたがっています。', exampleTranslation: 'He wants to go.' },
  { id: '8', pattern: '～かもしれない', meaning: 'might, maybe', usage: 'Possibility', example: '雨が降るかもしれません。', exampleTranslation: 'It might rain.' },
  { id: '9', pattern: '～たらどうですか', meaning: 'how about doing...?', usage: 'Suggestion', example: '休んだらどうですか。', exampleTranslation: 'How about taking a rest?' },
  { id: '10', pattern: 'Number+も', meaning: 'as many/much as', usage: 'Emphasize large quantity', example: '10冊も買いました。', exampleTranslation: 'I bought as many as 10 books.' },
  { id: '11', pattern: 'しか～ない', meaning: 'only, nothing but', usage: 'Limitation (negative)', example: '100円しかありません。', exampleTranslation: 'I only have 100 yen.' },
  { id: '12', pattern: '～ておく', meaning: 'do in advance', usage: 'Preparation', example: '買っておきます。', exampleTranslation: 'I\'ll buy it in advance.' },
  { id: '13', pattern: '～よう', meaning: 'let\'s (volitional)', usage: 'Intention or suggestion', example: '行こう。', exampleTranslation: 'Let\'s go.' },
  { id: '14', pattern: '～おう', meaning: 'let\'s (volitional)', usage: 'Casual intention', example: '食べよう。', exampleTranslation: 'Let\'s eat.' },
  { id: '15', pattern: '～てあげる', meaning: 'do for someone', usage: 'Giving favor (speaker to others)', example: '手伝ってあげます。', exampleTranslation: 'I\'ll help you.' },
  { id: '16', pattern: '～てくれる', meaning: 'do for me', usage: 'Receiving favor (others to speaker)', example: '手伝ってくれました。', exampleTranslation: 'They helped me.' },
  { id: '17', pattern: '～てもらう', meaning: 'have someone do', usage: 'Receiving favor (request)', example: '手伝ってもらいました。', exampleTranslation: 'I had them help me.' },
  { id: '18', pattern: '～ていただけませんか', meaning: 'could you please...?', usage: 'Very polite request', example: '教えていただけませんか。', exampleTranslation: 'Could you please teach me?' },
  { id: '19', pattern: '～といいです', meaning: 'I hope...', usage: 'Express hope or wish', example: '合格するといいです。', exampleTranslation: 'I hope I pass.' },
  { id: '20', pattern: '～てすみません', meaning: 'sorry for doing...', usage: 'Apologize for action', example: '遅れてすみません。', exampleTranslation: 'Sorry for being late.' },
  { id: '21', pattern: '～そうです', meaning: 'I heard that...', usage: 'Hearsay', example: '雨が降るそうです。', exampleTranslation: 'I heard it will rain.' },
  { id: '22', pattern: '～させる', meaning: 'make/let someone do', usage: 'Causative', example: '子供を遊ばせます。', exampleTranslation: 'I let the child play.' },
  { id: '23', pattern: '～なさい', meaning: 'do (command)', usage: 'Imperative (parental)', example: '勉強しなさい。', exampleTranslation: 'Study!' },
  { id: '24', pattern: '～ば/～れば', meaning: 'if, when', usage: 'Conditional', example: '安ければ買います。', exampleTranslation: 'If it\'s cheap, I\'ll buy it.' },
  { id: '25', pattern: '～ても', meaning: 'even if, even though', usage: 'Concession', example: '雨が降っても行きます。', exampleTranslation: 'Even if it rains, I\'ll go.' },
  { id: '26', pattern: '～たら', meaning: 'if, when, after', usage: 'Conditional/temporal', example: '着いたら電話します。', exampleTranslation: 'I\'ll call when I arrive.' },
  { id: '27', pattern: '～なくてもいい', meaning: 'don\'t have to', usage: 'No obligation', example: '行かなくてもいいです。', exampleTranslation: 'You don\'t have to go.' },
  { id: '28', pattern: '～みたい', meaning: 'like, similar to', usage: 'Resemblance', example: '雨が降るみたいです。', exampleTranslation: 'It seems like it will rain.' },
  { id: '29', pattern: '～てしまう', meaning: 'completely do, regrettably do', usage: 'Completion or regret', example: '食べてしまいました。', exampleTranslation: 'I ate it all up.' },
  { id: '30', pattern: 'Dictionary form+と', meaning: 'when, if (habitual)', usage: 'Natural consequence', example: '春になると暖かくなります。', exampleTranslation: 'When spring comes, it gets warm.' },
  { id: '31', pattern: '～ながら', meaning: 'while doing', usage: 'Simultaneous actions', example: '音楽を聞きながら勉強します。', exampleTranslation: 'I study while listening to music.' },
  { id: '32', pattern: '～ばよかった', meaning: 'should have done', usage: 'Regret', example: '勉強すればよかった。', exampleTranslation: 'I should have studied.' },
  { id: '33', pattern: '～てくれてありがとう', meaning: 'thank you for doing', usage: 'Express gratitude', example: '来てくれてありがとう。', exampleTranslation: 'Thank you for coming.' },
  { id: '34', pattern: '～てよかった', meaning: 'I\'m glad that...', usage: 'Relief or satisfaction', example: '会えてよかったです。', exampleTranslation: 'I\'m glad I could meet you.' },
  { id: '35', pattern: '～はずです', meaning: 'should be, expected to', usage: 'Expectation', example: '彼は来るはずです。', exampleTranslation: 'He should come.' },
  { id: '36', pattern: '～ないで', meaning: 'without doing', usage: 'Negative て-form', example: '食べないで寝ました。', exampleTranslation: 'I slept without eating.' },
  { id: '37', pattern: '～かどうか', meaning: 'whether or not', usage: 'Embedded question', example: '行くかどうか分かりません。', exampleTranslation: 'I don\'t know whether I\'ll go or not.' },
  { id: '38', pattern: '～という～', meaning: 'called, named', usage: 'Quotation or naming', example: '田中という人を知っていますか。', exampleTranslation: 'Do you know a person called Tanaka?' },
  { id: '39', pattern: '～やすい', meaning: 'easy to do', usage: 'Ease of action', example: 'この本は読みやすいです。', exampleTranslation: 'This book is easy to read.' },
  { id: '40', pattern: '～にくい', meaning: 'hard to do', usage: 'Difficulty of action', example: 'この漢字は読みにくいです。', exampleTranslation: 'This kanji is hard to read.' },
  { id: '41', pattern: '～られる', meaning: 'can do, passive', usage: 'Potential or passive', example: '日本語が話せます。', exampleTranslation: 'I can speak Japanese.' },
  { id: '42', pattern: '～てある', meaning: 'has been done', usage: 'Resultant state', example: '窓が開けてあります。', exampleTranslation: 'The window has been opened.' },
  { id: '43', pattern: '～ているあいだに,～', meaning: 'while doing, during', usage: 'Time period', example: '寝ている間に雨が降りました。', exampleTranslation: 'It rained while I was sleeping.' },
  { id: '44', pattern: '～く/～にする', meaning: 'decide on, make', usage: 'Decision or change', example: 'コーヒーにします。', exampleTranslation: 'I\'ll have coffee.' },
  { id: '45', pattern: '～てほしい', meaning: 'want someone to do', usage: 'Desire for others\' actions', example: '来てほしいです。', exampleTranslation: 'I want you to come.' },
  { id: '46', pattern: 'のに', meaning: 'although, despite', usage: 'Contradiction', example: '勉強したのに、できませんでした。', exampleTranslation: 'Although I studied, I couldn\'t do it.' },
  { id: '47', pattern: '～のような', meaning: 'like, such as', usage: 'Resemblance (noun modifier)', example: '彼のような人が好きです。', exampleTranslation: 'I like people like him.' },
  { id: '48', pattern: '～のように', meaning: 'like, as', usage: 'Resemblance (adverb)', example: '鳥のように飛びたいです。', exampleTranslation: 'I want to fly like a bird.' },
  { id: '49', pattern: '～させられる', meaning: 'be made to do', usage: 'Causative passive', example: '待たせられました。', exampleTranslation: 'I was made to wait.' },
  { id: '50', pattern: '～ことにする', meaning: 'decide to do', usage: 'Decision', example: '行くことにしました。', exampleTranslation: 'I decided to go.' },
];

// N3 Grammar Data
const n3Grammar: GrammarPoint[] = [
  { id: '1', pattern: '～たばかり', meaning: 'just did', usage: 'Recent completion', example: '今、食べたばかりです。', exampleTranslation: 'I just ate now.' },
  { id: '2', pattern: '～ようになる', meaning: 'come to, get to', usage: 'Gradual change', example: '日本語が話せるようになりました。', exampleTranslation: 'I came to be able to speak Japanese.' },
  { id: '3', pattern: '～ことになる', meaning: 'it has been decided that', usage: 'Decision made by others', example: '転勤することになりました。', exampleTranslation: 'It has been decided that I will transfer.' },
  { id: '4', pattern: '～とても～ない', meaning: 'cannot possibly', usage: 'Impossibility', example: 'とても信じられません。', exampleTranslation: 'I cannot possibly believe it.' },
  { id: '5', pattern: '～らしい', meaning: 'seems, apparently', usage: 'Hearsay or conjecture', example: '雨が降るらしいです。', exampleTranslation: 'It seems it will rain.' },
  { id: '6', pattern: '～て初めて', meaning: 'not until, only after', usage: 'Realization after experience', example: '失って初めて大切さが分かった。', exampleTranslation: 'Only after losing it did I understand its importance.' },
  { id: '7', pattern: '～ないで', meaning: 'without doing', usage: 'Negative て-form', example: '何も言わないで帰りました。', exampleTranslation: 'I went home without saying anything.' },
  { id: '8', pattern: '～によって', meaning: 'depending on, by means of', usage: 'Variation or method', example: '人によって意見が違います。', exampleTranslation: 'Opinions differ depending on the person.' },
  { id: '9', pattern: '～のような', meaning: 'like, such as', usage: 'Resemblance', example: '夢のような話です。', exampleTranslation: 'It\'s a story like a dream.' },
  { id: '10', pattern: '～ば～ほど', meaning: 'the more... the more...', usage: 'Proportional relationship', example: '勉強すればするほど分かります。', exampleTranslation: 'The more I study, the more I understand.' },
  { id: '11', pattern: 'N+ばかり', meaning: 'only, nothing but', usage: 'Excessive focus', example: 'ゲームばかりしています。', exampleTranslation: 'I do nothing but play games.' },
  { id: '12', pattern: '～は～で有名', meaning: 'famous for', usage: 'Reputation', example: '京都は寺で有名です。', exampleTranslation: 'Kyoto is famous for temples.' },
  { id: '13', pattern: 'N+を始め', meaning: 'starting with, including', usage: 'Representative example', example: '日本を始め、アジアで人気です。', exampleTranslation: 'It\'s popular in Asia, starting with Japan.' },
  { id: '14', pattern: '的', meaning: '-tic, -like (suffix)', usage: 'Characteristic', example: '日本的な文化', exampleTranslation: 'Japanese-like culture' },
  { id: '15', pattern: '～は～くらいです', meaning: 'about, approximately', usage: 'Approximation', example: '2時間くらいです。', exampleTranslation: 'It\'s about 2 hours.' },
  { id: '16', pattern: '～さえ～ば', meaning: 'if only, as long as', usage: 'Sufficient condition', example: 'お金さえあれば買えます。', exampleTranslation: 'As long as I have money, I can buy it.' },
  { id: '17', pattern: 'ほど', meaning: 'to the extent that', usage: 'Degree', example: '泣くほど嬉しかった。', exampleTranslation: 'I was happy to the extent of crying.' },
  { id: '18', pattern: 'まま', meaning: 'as is, unchanged', usage: 'Unchanged state', example: '靴を履いたまま入りました。', exampleTranslation: 'I entered with my shoes still on.' },
  { id: '19', pattern: 'わざわざ', meaning: 'expressly, specially', usage: 'Special effort', example: 'わざわざ来てくれました。', exampleTranslation: 'They specially came for me.' },
  { id: '20', pattern: '～としたら', meaning: 'if, supposing', usage: 'Hypothetical', example: '行くとしたら明日です。', exampleTranslation: 'If I go, it will be tomorrow.' },
  { id: '21', pattern: '～たものだ', meaning: 'used to', usage: 'Past habit', example: 'よく遊んだものだ。', exampleTranslation: 'I used to play a lot.' },
  { id: '22', pattern: '～たて', meaning: 'just done, fresh', usage: 'Freshly completed', example: '焼きたてのパン', exampleTranslation: 'freshly baked bread' },
  { id: '23', pattern: '～ぐらい', meaning: 'about, approximately', usage: 'Approximation', example: '1時間ぐらいかかります。', exampleTranslation: 'It takes about 1 hour.' },
  { id: '24', pattern: '～かえって', meaning: 'on the contrary, rather', usage: 'Opposite result', example: 'かえって悪くなりました。', exampleTranslation: 'On the contrary, it got worse.' },
  { id: '25', pattern: '～には～の～がある', meaning: 'has its own', usage: 'Unique characteristic', example: '国には国の文化があります。', exampleTranslation: 'Each country has its own culture.' },
  { id: '26', pattern: '～っぽい', meaning: '-ish, -like', usage: 'Tendency or appearance', example: '子供っぽい', exampleTranslation: 'childish' },
  { id: '27', pattern: '～に関する', meaning: 'concerning, regarding', usage: 'Topic', example: '環境に関する問題', exampleTranslation: 'issues concerning the environment' },
  { id: '28', pattern: 'まさか', meaning: 'surely not, no way', usage: 'Disbelief', example: 'まさか本当じゃないでしょう。', exampleTranslation: 'Surely it\'s not true.' },
  { id: '29', pattern: 'まい', meaning: 'probably won\'t, intention not to', usage: 'Negative volition', example: '二度と来るまい。', exampleTranslation: 'I won\'t come again.' },
  { id: '30', pattern: 'きり', meaning: 'only, just', usage: 'Limitation', example: '一度きり会いました。', exampleTranslation: 'I met them only once.' },
  { id: '31', pattern: 'いったい（一体）', meaning: 'on earth, in the world', usage: 'Emphasis in questions', example: '一体何が起きたのですか。', exampleTranslation: 'What on earth happened?' },
  { id: '32', pattern: 'ふり', meaning: 'pretend, act like', usage: 'Pretense', example: '知らないふりをしました。', exampleTranslation: 'I pretended not to know.' },
  { id: '33', pattern: 'どうやら', meaning: 'apparently, it seems', usage: 'Conjecture', example: 'どうやら間に合わないようです。', exampleTranslation: 'It seems we won\'t make it in time.' },
  { id: '34', pattern: 'おかげで', meaning: 'thanks to', usage: 'Positive result', example: 'あなたのおかげで成功しました。', exampleTranslation: 'Thanks to you, I succeeded.' },
  { id: '35', pattern: 'さらに（更に）', meaning: 'furthermore, moreover', usage: 'Addition', example: 'さらに詳しく説明します。', exampleTranslation: 'I will explain furthermore in detail.' },
  { id: '36', pattern: 'すでに（既に）', meaning: 'already', usage: 'Completion', example: 'すでに終わりました。', exampleTranslation: 'It already finished.' },
  { id: '37', pattern: 'つい', meaning: 'unintentionally, accidentally', usage: 'Unintended action', example: 'つい忘れてしまいました。', exampleTranslation: 'I accidentally forgot.' },
  { id: '38', pattern: 'むしろ', meaning: 'rather, instead', usage: 'Preference', example: 'むしろ家にいたいです。', exampleTranslation: 'I\'d rather stay home.' },
  { id: '39', pattern: 'さえ', meaning: 'even', usage: 'Extreme example', example: '子供さえ知っています。', exampleTranslation: 'Even children know it.' },
  { id: '40', pattern: '～になれる', meaning: 'get used to', usage: 'Adaptation', example: '日本の生活に慣れました。', exampleTranslation: 'I got used to life in Japan.' },
  { id: '41', pattern: '～に違いない', meaning: 'must be, no doubt', usage: 'Strong certainty', example: '彼が犯人に違いない。', exampleTranslation: 'He must be the culprit.' },
  { id: '42', pattern: 'なかなか', meaning: 'not easily, quite', usage: 'Difficulty or praise', example: 'なかなか終わりません。', exampleTranslation: 'It doesn\'t finish easily.' },
  { id: '43', pattern: '～ために', meaning: 'for, in order to', usage: 'Purpose', example: '合格するために勉強します。', exampleTranslation: 'I study in order to pass.' },
  { id: '44', pattern: '～ず', meaning: 'without doing', usage: 'Negative form (formal)', example: '何も言わず帰りました。', exampleTranslation: 'I went home without saying anything.' },
  { id: '45', pattern: '～によると', meaning: 'according to', usage: 'Information source', example: 'ニュースによると雨が降るそうです。', exampleTranslation: 'According to the news, it will rain.' },
  { id: '46', pattern: '～代わり', meaning: 'instead of, in place of', usage: 'Substitution', example: '私の代わりに行ってください。', exampleTranslation: 'Please go in my place.' },
  { id: '47', pattern: 'ようにする', meaning: 'try to, make sure to', usage: 'Effort or habit', example: '毎日運動するようにしています。', exampleTranslation: 'I make sure to exercise every day.' },
  { id: '48', pattern: '～始める', meaning: 'begin to', usage: 'Start of action', example: '雨が降り始めました。', exampleTranslation: 'It began to rain.' },
  { id: '49', pattern: '～ても', meaning: 'even if', usage: 'Concession', example: '高くても買います。', exampleTranslation: 'Even if it\'s expensive, I\'ll buy it.' },
  { id: '50', pattern: '～として', meaning: 'as, in the role of', usage: 'Capacity or role', example: '先生として働いています。', exampleTranslation: 'I work as a teacher.' },
  { id: '51', pattern: 'ように', meaning: 'so that, in order to', usage: 'Purpose', example: '忘れないように書きました。', exampleTranslation: 'I wrote it down so I wouldn\'t forget.' },
  { id: '52', pattern: 'こそ', meaning: 'precisely, exactly (emphasis)', usage: 'Strong emphasis', example: 'これこそ私が欲しかったものです。', exampleTranslation: 'This is precisely what I wanted.' },
  { id: '53', pattern: '～ないうちに', meaning: 'before, while not yet', usage: 'Time limit', example: '忘れないうちにメモしました。', exampleTranslation: 'I made a note before I forgot.' },
  { id: '54', pattern: 'どうしても', meaning: 'no matter what, by all means', usage: 'Strong determination', example: 'どうしても行きたいです。', exampleTranslation: 'I want to go no matter what.' },
  { id: '55', pattern: '～がち', meaning: 'tend to, prone to', usage: 'Tendency', example: '忘れがちです。', exampleTranslation: 'I tend to forget.' },
  { id: '56', pattern: 'せいぜい', meaning: 'at most, at best', usage: 'Maximum limit', example: 'せいぜい1時間です。', exampleTranslation: 'It\'s 1 hour at most.' },
  { id: '57', pattern: '限る', meaning: 'limited to, nothing better than', usage: 'Limitation or best choice', example: '夏はビールに限ります。', exampleTranslation: 'In summer, nothing beats beer.' },
  { id: '58', pattern: '～とともに～', meaning: 'together with, as', usage: 'Accompaniment or progression', example: '時間とともに良くなります。', exampleTranslation: 'It gets better with time.' },
  { id: '59', pattern: '～たび～', meaning: 'every time, whenever', usage: 'Repetition', example: '会うたびに元気になります。', exampleTranslation: 'I feel better every time we meet.' },
  { id: '60', pattern: 'すぎない（過ぎない）', meaning: 'nothing more than, merely', usage: 'Limitation', example: '冗談に過ぎません。', exampleTranslation: 'It\'s nothing more than a joke.' },
  { id: '61', pattern: 'おいて（於いて）', meaning: 'at, in (formal)', usage: 'Location (formal)', example: '会議において決定されました。', exampleTranslation: 'It was decided at the meeting.' },
  { id: '62', pattern: '～げ', meaning: '-looking, -seeming', usage: 'Appearance', example: '寂しげな顔', exampleTranslation: 'lonely-looking face' },
  { id: '63', pattern: 'つもりで', meaning: 'with the intention of', usage: 'Intention or assumption', example: '冗談のつもりで言いました。', exampleTranslation: 'I said it with the intention of joking.' },
];

// N2 Grammar Data
const n2Grammar: GrammarPoint[] = [
  { id: '1', pattern: '～ことにする', meaning: 'decide to do', usage: 'Decision', example: '毎日走ることにしました。', exampleTranslation: 'I decided to run every day.' },
  { id: '2', pattern: '～ばいいのに', meaning: 'I wish, if only', usage: 'Regret or suggestion', example: 'もっと勉強すればいいのに。', exampleTranslation: 'I wish you would study more.' },
  { id: '3', pattern: '～なかなか～ない', meaning: 'not easily, hardly', usage: 'Difficulty', example: 'なかなか終わりません。', exampleTranslation: 'It doesn\'t finish easily.' },
  { id: '4', pattern: '～しか～ない', meaning: 'only, nothing but', usage: 'Limitation', example: '100円しかありません。', exampleTranslation: 'I only have 100 yen.' },
  { id: '5', pattern: '～わけです', meaning: 'it means that, no wonder', usage: 'Explanation or conclusion', example: '忙しいわけです。', exampleTranslation: 'No wonder you\'re busy.' },
  { id: '6', pattern: '～にあたる', meaning: 'correspond to, be equivalent to', usage: 'Equivalence', example: '社長にあたる人です。', exampleTranslation: 'He\'s the person who corresponds to the president.' },
  { id: '7', pattern: '以外の', meaning: 'other than, except', usage: 'Exclusion', example: 'これ以外の方法はありません。', exampleTranslation: 'There\'s no method other than this.' },
  { id: '8', pattern: '～というわけではない', meaning: 'it doesn\'t mean that', usage: 'Partial negation', example: '嫌いというわけではありません。', exampleTranslation: 'It doesn\'t mean I hate it.' },
  { id: '9', pattern: 'なるべく', meaning: 'as much as possible', usage: 'Effort', example: 'なるべく早く来てください。', exampleTranslation: 'Please come as early as possible.' },
  { id: '10', pattern: '別に～ない', meaning: 'not particularly', usage: 'Negation of special quality', example: '別に問題ありません。', exampleTranslation: 'There\'s no particular problem.' },
  { id: '11', pattern: 'たしか', meaning: 'if I remember correctly', usage: 'Uncertain memory', example: 'たしか3時だったと思います。', exampleTranslation: 'If I remember correctly, it was 3 o\'clock.' },
  { id: '12', pattern: '何といっても', meaning: 'after all, no matter what', usage: 'Emphasis', example: '何といっても健康が大切です。', exampleTranslation: 'After all, health is important.' },
  { id: '13', pattern: 'やっぱり', meaning: 'as expected, after all', usage: 'Confirmation', example: 'やっぱり難しいです。', exampleTranslation: 'As expected, it\'s difficult.' },
  { id: '14', pattern: '～と言っても～', meaning: 'although I say, even though', usage: 'Qualification', example: '勉強したと言っても1時間だけです。', exampleTranslation: 'Although I say I studied, it was only 1 hour.' },
  { id: '15', pattern: '～は～に限る', meaning: 'nothing beats, best for', usage: 'Superlative preference', example: '夏はビールに限ります。', exampleTranslation: 'Nothing beats beer in summer.' },
  { id: '16', pattern: '～に気をつける', meaning: 'be careful of, watch out for', usage: 'Caution', example: '車に気をつけてください。', exampleTranslation: 'Please be careful of cars.' },
  { id: '17', pattern: 'ろくに～ない', meaning: 'hardly, not properly', usage: 'Insufficiency', example: 'ろくに食べていません。', exampleTranslation: 'I haven\'t eaten properly.' },
  { id: '18', pattern: 'せいか', meaning: 'perhaps because', usage: 'Possible reason', example: '疲れたせいか眠いです。', exampleTranslation: 'Perhaps because I\'m tired, I\'m sleepy.' },
  { id: '19', pattern: '～に越したことはない', meaning: 'nothing is better than', usage: 'Best option', example: '早いに越したことはない。', exampleTranslation: 'Nothing is better than being early.' },
  { id: '20', pattern: 'くせに', meaning: 'and yet, in spite of', usage: 'Criticism', example: '知っているくせに教えない。', exampleTranslation: 'Even though you know, you don\'t tell me.' },
  { id: '21', pattern: 'ゆえに', meaning: 'therefore, because of', usage: 'Formal reason', example: '病気ゆえに欠席します。', exampleTranslation: 'I will be absent because of illness.' },
  { id: '22', pattern: 'および', meaning: 'and, as well as', usage: 'Formal conjunction', example: '日本および韓国', exampleTranslation: 'Japan and Korea' },
  { id: '23', pattern: 'まんいち（万一）', meaning: 'if by any chance', usage: 'Unlikely possibility', example: '万一の場合に備えます。', exampleTranslation: 'I\'ll prepare in case of emergency.' },
  { id: '24', pattern: 'あえて', meaning: 'dare to, purposely', usage: 'Deliberate action', example: 'あえて言いません。', exampleTranslation: 'I dare not say it.' },
  { id: '25', pattern: 'がてら', meaning: 'while, on the occasion of', usage: 'Simultaneous purpose', example: '散歩がてら買い物に行きます。', exampleTranslation: 'I\'ll go shopping while taking a walk.' },
  { id: '26', pattern: 'かけては', meaning: 'when it comes to', usage: 'Expertise or concern', example: '料理にかけては彼が一番です。', exampleTranslation: 'When it comes to cooking, he\'s the best.' },
  { id: '27', pattern: 'かねない', meaning: 'might, could possibly', usage: 'Negative possibility', example: '失敗しかねません。', exampleTranslation: 'I might fail.' },
  { id: '28', pattern: 'いよいよ', meaning: 'finally, at last', usage: 'Culmination', example: 'いよいよ始まります。', exampleTranslation: 'It finally begins.' },
  { id: '29', pattern: '～からなる(成る)', meaning: 'consist of, be composed of', usage: 'Composition', example: 'チームは5人からなります。', exampleTranslation: 'The team consists of 5 people.' },
  { id: '30', pattern: 'いつのまにか', meaning: 'before one knows, unnoticed', usage: 'Gradual change', example: 'いつのまにか寝ていました。', exampleTranslation: 'Before I knew it, I had fallen asleep.' },
  { id: '31', pattern: '～ないで済む', meaning: 'get by without doing', usage: 'Avoidance', example: '行かないで済みました。', exampleTranslation: 'I got by without going.' },
  { id: '32', pattern: 'せっかく', meaning: 'with trouble, specially', usage: 'Wasted effort or opportunity', example: 'せっかく来たのに会えませんでした。', exampleTranslation: 'Even though I came specially, I couldn\'t meet them.' },
  { id: '33', pattern: '～わけにはいかない', meaning: 'cannot afford to', usage: 'Social obligation', example: '断るわけにはいきません。', exampleTranslation: 'I cannot afford to refuse.' },
  { id: '34', pattern: '～ないわけにはいかない', meaning: 'must, have to', usage: 'Strong obligation', example: '行かないわけにはいきません。', exampleTranslation: 'I must go.' },
  { id: '35', pattern: '～た上で', meaning: 'after doing, upon', usage: 'Sequential action', example: '考えた上で決めます。', exampleTranslation: 'I\'ll decide after thinking.' },
  { id: '36', pattern: '～ような気がする', meaning: 'feel like, have a feeling', usage: 'Vague impression', example: '雨が降るような気がします。', exampleTranslation: 'I have a feeling it will rain.' },
  { id: '37', pattern: 'いったんーば', meaning: 'once, if once', usage: 'Condition with consequence', example: 'いったん始めれば終わらせます。', exampleTranslation: 'Once I start, I\'ll finish it.' },
  { id: '38', pattern: '～でいいです', meaning: 'is fine, will do', usage: 'Acceptance', example: 'これでいいです。', exampleTranslation: 'This will do.' },
  { id: '39', pattern: 'やむをえず', meaning: 'unavoidably, reluctantly', usage: 'No choice', example: 'やむをえず欠席しました。', exampleTranslation: 'I was unavoidably absent.' },
  { id: '40', pattern: '～ではないだろうか', meaning: 'isn\'t it?, don\'t you think?', usage: 'Rhetorical question', example: '正しいのではないだろうか。', exampleTranslation: 'Don\'t you think it\'s correct?' },
  { id: '41', pattern: 'ろくに', meaning: 'properly, well (with negative)', usage: 'Insufficiency', example: 'ろくに寝ていません。', exampleTranslation: 'I haven\'t slept properly.' },
  { id: '42', pattern: '～より仕方がない', meaning: 'have no choice but to', usage: 'Only option', example: '待つより仕方がありません。', exampleTranslation: 'I have no choice but to wait.' },
  { id: '43', pattern: 'せめて', meaning: 'at least', usage: 'Minimum expectation', example: 'せめて一度は会いたいです。', exampleTranslation: 'I want to meet at least once.' },
  { id: '44', pattern: '～ものですから', meaning: 'because, since (polite)', usage: 'Polite reason', example: '忙しいものですから行けません。', exampleTranslation: 'Because I\'m busy, I can\'t go.' },
  { id: '45', pattern: '～が気になる', meaning: 'be concerned about, worry about', usage: 'Concern', example: '結果が気になります。', exampleTranslation: 'I\'m concerned about the results.' },
  { id: '46', pattern: '思うように', meaning: 'as one wishes, as expected', usage: 'Expectation', example: '思うようにいきません。', exampleTranslation: 'It doesn\'t go as I wish.' },
  { id: '47', pattern: 'よっぽど', meaning: 'very much, considerably', usage: 'High degree', example: 'よっぽど疲れています。', exampleTranslation: 'I\'m very tired.' },
  { id: '48', pattern: 'さすがに', meaning: 'as expected, indeed', usage: 'Acknowledgment', example: 'さすがに難しいです。', exampleTranslation: 'As expected, it\'s difficult.' },
  { id: '49', pattern: 'ものの', meaning: 'although, but', usage: 'Concession', example: '分かったものの、できません。', exampleTranslation: 'Although I understand, I can\'t do it.' },
  { id: '50', pattern: '一方では', meaning: 'on the other hand', usage: 'Contrast', example: '便利な一方では危険です。', exampleTranslation: 'On the other hand, it\'s dangerous while being convenient.' },
  { id: '51', pattern: 'それにしても', meaning: 'even so, nevertheless', usage: 'Emphasis despite context', example: 'それにしても高すぎます。', exampleTranslation: 'Even so, it\'s too expensive.' },
  { id: '52', pattern: '～を～にまかせる', meaning: 'leave to, entrust to', usage: 'Delegation', example: '彼に任せます。', exampleTranslation: 'I\'ll leave it to him.' },
  { id: '53', pattern: 'いたるまで（至るまで）', meaning: 'up to, as far as', usage: 'Extent', example: '子供から大人に至るまで', exampleTranslation: 'from children up to adults' },
  { id: '54', pattern: 'かねる', meaning: 'cannot, difficult to', usage: 'Inability (polite)', example: '決めかねます。', exampleTranslation: 'I cannot decide.' },
  { id: '55', pattern: 'さしつかえない', meaning: 'no problem, no objection', usage: 'Permission', example: '明日でも差し支えありません。', exampleTranslation: 'Tomorrow is no problem.' },
  { id: '56', pattern: 'たちまち', meaning: 'in an instant, quickly', usage: 'Rapid change', example: 'たちまち有名になりました。', exampleTranslation: 'They became famous in an instant.' },
  { id: '57', pattern: 'つうじて（通じて）', meaning: 'through, throughout', usage: 'Medium or duration', example: '一年を通じて暖かいです。', exampleTranslation: 'It\'s warm throughout the year.' },
  { id: '58', pattern: 'なにしろ（何しろ）', meaning: 'anyway, after all', usage: 'Reason or excuse', example: '何しろ初めてですから。', exampleTranslation: 'After all, it\'s my first time.' },
  { id: '59', pattern: 'かたわら（傍ら）', meaning: 'while, besides', usage: 'Simultaneous activity', example: '仕事の傍ら勉強しています。', exampleTranslation: 'I study while working.' },
  { id: '60', pattern: 'ごとし（如し）', meaning: 'like, as if (literary)', usage: 'Simile (formal)', example: '雷の如き音', exampleTranslation: 'a sound like thunder' },
  { id: '61', pattern: 'たまらない', meaning: 'unbearable, can\'t stand', usage: 'Extreme feeling', example: '暑くてたまりません。', exampleTranslation: 'It\'s unbearably hot.' },
  { id: '62', pattern: 'とうてい', meaning: 'possibly, by any means (with negative)', usage: 'Impossibility', example: 'とうてい無理です。', exampleTranslation: 'It\'s by no means possible.' },
  { id: '63', pattern: 'のぼる', meaning: 'amount to, reach', usage: 'Quantity', example: '被害は100万円に上ります。', exampleTranslation: 'The damage amounts to 1 million yen.' },
];

// N1 Grammar Data
const n1Grammar: GrammarPoint[] = [
  { id: '1', pattern: '～めく', meaning: 'show signs of, -like', usage: 'Appearance or tendency', example: '春めいてきました。', exampleTranslation: 'It\'s starting to show signs of spring.' },
  { id: '2', pattern: '～かたわら', meaning: 'while, besides', usage: 'Simultaneous activities', example: '仕事のかたわら小説を書いています。', exampleTranslation: 'I write novels while working.' },
  { id: '3', pattern: '～と思いきや', meaning: 'contrary to expectation', usage: 'Unexpected result', example: '簡単だと思いきや、難しかった。', exampleTranslation: 'Contrary to thinking it would be easy, it was difficult.' },
  { id: '4', pattern: '～が早いか', meaning: 'as soon as, no sooner than', usage: 'Immediate succession', example: '帰るが早いか寝てしまった。', exampleTranslation: 'No sooner had I returned than I fell asleep.' },
  { id: '5', pattern: 'ただ～のみ', meaning: 'only, nothing but', usage: 'Limitation (formal)', example: 'ただ待つのみです。', exampleTranslation: 'There is nothing but to wait.' },
  { id: '6', pattern: '～なり', meaning: 'as soon as, while remaining', usage: 'Immediate action or unchanged state', example: '座るなり眠ってしまった。', exampleTranslation: 'As soon as I sat down, I fell asleep.' },
  { id: '7', pattern: '～や否や（いなや）', meaning: 'as soon as, the moment', usage: 'Immediate succession', example: '聞くや否や飛び出した。', exampleTranslation: 'The moment I heard, I rushed out.' },
  { id: '8', pattern: '～ごとき', meaning: 'like, such as (contemptuous)', usage: 'Comparison (derogatory)', example: '君ごときに負けない。', exampleTranslation: 'I won\'t lose to the likes of you.' },
  { id: '9', pattern: '～がてら', meaning: 'while, on the occasion of', usage: 'Combined purpose', example: '散歩がてら買い物をする。', exampleTranslation: 'I shop while taking a walk.' },
  { id: '10', pattern: '～を皮切りに', meaning: 'starting with, beginning with', usage: 'First in series', example: '東京を皮切りに全国ツアーを行う。', exampleTranslation: 'Starting with Tokyo, we\'ll do a nationwide tour.' },
  { id: '11', pattern: '～をもって', meaning: 'with, by means of', usage: 'Method or end point (formal)', example: '本日をもって閉店します。', exampleTranslation: 'We will close as of today.' },
  { id: '12', pattern: '～が最後', meaning: 'once... then', usage: 'Point of no return', example: '泣き出したが最後、止まらない。', exampleTranslation: 'Once she starts crying, she won\'t stop.' },
  { id: '13', pattern: '～まみれ', meaning: 'covered with, smeared with', usage: 'Covered in something unpleasant', example: '泥まみれになった。', exampleTranslation: 'I got covered in mud.' },
  { id: '14', pattern: '～とあれば', meaning: 'if it is the case that', usage: 'Special circumstance', example: '子供のためとあれば何でもします。', exampleTranslation: 'If it\'s for my child, I\'ll do anything.' },
  { id: '15', pattern: '～ともなると', meaning: 'when it comes to', usage: 'Special status or level', example: '社長ともなると忙しい。', exampleTranslation: 'When it comes to being president, one is busy.' },
  { id: '16', pattern: '～なくしては', meaning: 'without, unless', usage: 'Necessity', example: '努力なくしては成功しない。', exampleTranslation: 'Without effort, there is no success.' },
  { id: '17', pattern: '～なしに', meaning: 'without', usage: 'Absence', example: '許可なしに入れません。', exampleTranslation: 'You cannot enter without permission.' },
  { id: '18', pattern: '～ならでは', meaning: 'unique to, only possible with', usage: 'Exclusivity', example: '彼ならではの発想です。', exampleTranslation: 'It\'s an idea unique to him.' },
  { id: '19', pattern: '～に足る', meaning: 'worthy of, deserve', usage: 'Merit', example: '信頼に足る人物です。', exampleTranslation: 'He is a person worthy of trust.' },
  { id: '20', pattern: '～とあって', meaning: 'because, since', usage: 'Natural consequence', example: '休日とあって人が多い。', exampleTranslation: 'Since it\'s a holiday, there are many people.' },
  { id: '21', pattern: '～べく', meaning: 'in order to, so as to', usage: 'Purpose (formal)', example: '成功すべく努力する。', exampleTranslation: 'I make efforts in order to succeed.' },
  { id: '22', pattern: '～かたがた', meaning: 'while, combined with', usage: 'Dual purpose (formal)', example: 'お礼かたがたご挨拶に伺います。', exampleTranslation: 'I will visit to express thanks and greetings.' },
  { id: '23', pattern: '～たところで', meaning: 'even if, even though', usage: 'Futility', example: '今更言ったところで遅い。', exampleTranslation: 'Even if you say it now, it\'s too late.' },
  { id: '24', pattern: '～であれ', meaning: 'whether... or, even if', usage: 'Regardless', example: '誰であれ規則を守るべきだ。', exampleTranslation: 'Whoever it is should follow the rules.' },
  { id: '25', pattern: '～にたえない', meaning: 'unbearable, intolerable', usage: 'Cannot endure', example: '見るに堪えない光景だ。', exampleTranslation: 'It\'s an unbearable sight.' },
  { id: '26', pattern: '～を限りに', meaning: 'as of, after', usage: 'Final point', example: '今日を限りに辞めます。', exampleTranslation: 'I will quit as of today.' },
  { id: '27', pattern: '～ところを', meaning: 'just when, although', usage: 'Interruption or contrast', example: 'お忙しいところをすみません。', exampleTranslation: 'I\'m sorry to bother you when you\'re busy.' },
  { id: '28', pattern: '～にそくして', meaning: 'in accordance with, based on', usage: 'Conformity', example: '規則に即して行動する。', exampleTranslation: 'Act in accordance with the rules.' },
  { id: '29', pattern: '～とはいえ', meaning: 'although, even though', usage: 'Concession', example: '学生とはいえ大人です。', exampleTranslation: 'Although a student, they are an adult.' },
  { id: '30', pattern: '～ものを', meaning: 'although, but (regret)', usage: 'Regret or criticism', example: '言えばいいものを黙っていた。', exampleTranslation: 'Although I should have said it, I kept quiet.' },
  { id: '31', pattern: '～ようが', meaning: 'no matter how, whether or not', usage: 'Regardless', example: '何を言おうが聞かない。', exampleTranslation: 'No matter what I say, they won\'t listen.' },
  { id: '32', pattern: '～いかん', meaning: 'depending on', usage: 'Conditional factor', example: '結果いかんで決めます。', exampleTranslation: 'I\'ll decide depending on the results.' },
  { id: '33', pattern: '～と相まって', meaning: 'combined with, together with', usage: 'Synergy', example: '努力と才能が相まって成功した。', exampleTranslation: 'Effort combined with talent led to success.' },
  { id: '34', pattern: '～をよそに', meaning: 'in defiance of, ignoring', usage: 'Disregard', example: '心配をよそに元気だ。', exampleTranslation: 'In defiance of worries, they are fine.' },
  { id: '35', pattern: '～ないまでも', meaning: 'even if not, if not... at least', usage: 'Minimum expectation', example: '成功しないまでも努力は必要だ。', exampleTranslation: 'Even if not successful, effort is necessary.' },
  { id: '36', pattern: '～てもさしつかえない', meaning: 'it\'s okay to, no problem to', usage: 'Permission', example: '使っても差し支えありません。', exampleTranslation: 'It\'s okay to use it.' },
  { id: '37', pattern: '～たる', meaning: 'being, as (formal)', usage: 'Status or role', example: '教師たる者は模範を示すべきだ。', exampleTranslation: 'One who is a teacher should set an example.' },
  { id: '38', pattern: '～まじき', meaning: 'should not, unbecoming', usage: 'Impropriety', example: '教師にあるまじき行為だ。', exampleTranslation: 'It\'s conduct unbecoming of a teacher.' },
  { id: '39', pattern: '～極まる', meaning: 'extremely, utterly', usage: 'Extreme degree', example: '失礼極まる態度だ。', exampleTranslation: 'It\'s an extremely rude attitude.' },
  { id: '40', pattern: '～にかこつけて', meaning: 'using as an excuse', usage: 'Pretext', example: '忙しさにかこつけて断った。', exampleTranslation: 'I refused using busyness as an excuse.' },
  { id: '41', pattern: '～に（は）あたらない', meaning: 'not worth, no need to', usage: 'Unnecessary', example: '驚くには当たらない。', exampleTranslation: 'It\'s not worth being surprised about.' },
  { id: '42', pattern: '～にかたくない', meaning: 'not difficult to, easy to imagine', usage: 'Predictability', example: '想像に難くない。', exampleTranslation: 'It\'s not difficult to imagine.' },
  { id: '43', pattern: '～べからず', meaning: 'must not, should not', usage: 'Prohibition (formal)', example: '立入るべからず。', exampleTranslation: 'No entry.' },
  { id: '44', pattern: '～を禁じ得ない', meaning: 'cannot help but', usage: 'Involuntary feeling', example: '驚きを禁じ得ない。', exampleTranslation: 'I cannot help but be surprised.' },
  { id: '45', pattern: '～たりとも', meaning: 'even, not even', usage: 'Extreme limitation', example: '一瞬たりとも油断できない。', exampleTranslation: 'I cannot let my guard down even for a moment.' },
  { id: '46', pattern: '～きらいがある', meaning: 'tend to, have a tendency', usage: 'Negative tendency', example: '彼は怒りやすいきらいがある。', exampleTranslation: 'He tends to get angry easily.' },
  { id: '47', pattern: '～しまつだ', meaning: 'end up, result in', usage: 'Negative outcome', example: '借金する始末だ。', exampleTranslation: 'It ended up with borrowing money.' },
  { id: '48', pattern: '～を余儀なくされる', meaning: 'be forced to, be compelled to', usage: 'Unavoidable action', example: '辞職を余儀なくされた。', exampleTranslation: 'I was forced to resign.' },
  { id: '49', pattern: '～てやまない', meaning: 'never cease to, always', usage: 'Continuous feeling', example: '成功を願ってやみません。', exampleTranslation: 'I never cease to wish for success.' },
  { id: '50', pattern: '～割りに（は）', meaning: 'considering, for', usage: 'Disproportionate result', example: '高い割においしくない。', exampleTranslation: 'Considering it\'s expensive, it\'s not delicious.' },
  { id: '51', pattern: '～かいもなく', meaning: 'in vain, without result', usage: 'Wasted effort', example: '努力の甲斐もなく失敗した。', exampleTranslation: 'Despite efforts, I failed.' },
  { id: '52', pattern: '～だけまし', meaning: 'at least, better than nothing', usage: 'Silver lining', example: '怪我がなかっただけましだ。', exampleTranslation: 'At least there were no injuries.' },
  { id: '53', pattern: '～ないではすまない', meaning: 'cannot avoid doing', usage: 'Obligation', example: '謝らないでは済まない。', exampleTranslation: 'I cannot avoid apologizing.' },
  { id: '54', pattern: '～をふまえて', meaning: 'based on, in light of', usage: 'Consideration', example: '意見を踏まえて決定します。', exampleTranslation: 'I\'ll decide based on opinions.' },
  { id: '55', pattern: '～をおして', meaning: 'in spite of, pushing through', usage: 'Overcoming difficulty', example: '病気を押して出勤した。', exampleTranslation: 'I went to work in spite of illness.' },
  { id: '56', pattern: '～を経て', meaning: 'through, after', usage: 'Process', example: '長い議論を経て決まった。', exampleTranslation: 'It was decided after long discussions.' },
  { id: '57', pattern: '～ゆえ', meaning: 'because, due to', usage: 'Reason (formal)', example: '若さゆえの過ちだ。', exampleTranslation: 'It\'s a mistake due to youth.' },
  { id: '58', pattern: '～ながらも', meaning: 'while, although', usage: 'Concession with continuation', example: '小さいながらも立派だ。', exampleTranslation: 'Although small, it\'s splendid.' },
  { id: '59', pattern: '～ことなしに', meaning: 'without', usage: 'Absence of action', example: '努力することなしに成功はない。', exampleTranslation: 'There is no success without making efforts.' },
  { id: '60', pattern: '～ではあるまいし', meaning: 'it\'s not like, it\'s not as if', usage: 'Rejection of comparison', example: '子供ではあるまいし分かるでしょう。', exampleTranslation: 'It\'s not like you\'re a child, so you should understand.' },
  { id: '61', pattern: '～てからというもの', meaning: 'ever since', usage: 'Continuous state after event', example: '結婚してからというもの幸せだ。', exampleTranslation: 'Ever since getting married, I\'ve been happy.' },
  { id: '62', pattern: '～としたところで', meaning: 'even if, even supposing', usage: 'Hypothetical futility', example: '今更後悔したところで遅い。', exampleTranslation: 'Even if you regret now, it\'s too late.' },
  { id: '63', pattern: '～（で）すら', meaning: 'even', usage: 'Extreme example', example: '彼ですら知らない。', exampleTranslation: 'Even he doesn\'t know.' },
  { id: '64', pattern: '～といえども', meaning: 'even though, even if', usage: 'Concession (formal)', example: '天才といえども努力は必要だ。', exampleTranslation: 'Even though a genius, effort is necessary.' },
  { id: '65', pattern: '～っぱなし', meaning: 'leaving as is, continuously', usage: 'Unchanged state', example: 'ドアを開けっぱなしにした。', exampleTranslation: 'I left the door open.' },
  { id: '66', pattern: '～ずくめ', meaning: 'entirely, all', usage: 'Complete coverage', example: '黒ずくめの服装', exampleTranslation: 'all black clothing' },
  { id: '67', pattern: '～ながらに', meaning: 'while remaining, as is', usage: 'Unchanged state', example: '生まれながらの才能', exampleTranslation: 'innate talent' },
  { id: '68', pattern: '～にもまして', meaning: 'more than, even more than', usage: 'Surpassing comparison', example: '去年にもまして忙しい。', exampleTranslation: 'I\'m even busier than last year.' },
  { id: '69', pattern: '～にひきかえ', meaning: 'in contrast to, unlike', usage: 'Contrast', example: '兄に引き換え弟は真面目だ。', exampleTranslation: 'In contrast to the older brother, the younger is serious.' },
  { id: '70', pattern: '～はおろか', meaning: 'let alone, not to mention', usage: 'Extreme comparison', example: '英語はおろか日本語も話せない。', exampleTranslation: 'Let alone English, I can\'t even speak Japanese.' },
];

const grammarByLevel: Record<string, GrammarPoint[]> = {
  N5: n5Grammar,
  N4: n4Grammar,
  N3: n3Grammar,
  N2: n2Grammar,
  N1: n1Grammar,
};

export default function GrammarLevelPage() {
  const params = useParams();
  const level = (params.level as string).toUpperCase();
  const [grammarList, setGrammarList] = useState<GrammarPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load grammar data for the level
    const data = grammarByLevel[level] || [];
    setGrammarList(data);
    setLoading(false);
  }, [level]);

  const filteredGrammar = grammarList.filter(g => 
    g.pattern.includes(searchTerm) ||
    g.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.usage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const levelInfo = {
    N5: { title: 'JLPT N5 Grammar', description: 'Basic grammar patterns for everyday situations', count: '40 patterns' },
    N4: { title: 'JLPT N4 Grammar', description: 'Elementary grammar for daily communication', count: '50 patterns' },
    N3: { title: 'JLPT N3 Grammar', description: 'Intermediate grammar for work and social situations', count: '63 patterns' },
    N2: { title: 'JLPT N2 Grammar', description: 'Advanced grammar for professional use', count: '63 patterns' },
    N1: { title: 'JLPT N1 Grammar', description: 'Near-native grammar proficiency', count: '70 patterns' },
  };

  const info = levelInfo[level as keyof typeof levelInfo];

  // SEO metadata
  useEffect(() => {
    if (!info) return;

    const pageTitle = `JLPT ${level} Grammar - ${grammarList.length} Patterns | Rocket JLPT`;
    const pageDescription = `Complete JLPT ${level} grammar reference with ${grammarList.length} patterns. Learn Japanese grammar with meanings, usage examples, and translations for ${level} level.`;
    const pageUrl = `https://rocketjlpt.com/jlpt/${level.toLowerCase()}/grammar`;

    // Set document title
    document.title = pageTitle;

    // Update meta tags
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
    updateMetaTag('keywords', `jlpt ${level.toLowerCase()} grammar, ${level} grammar patterns, japanese grammar ${level}, jlpt ${level.toLowerCase()} grammar list, ${level} grammar reference`);
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
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "name": `JLPT ${level} Grammar Reference`,
      "description": pageDescription,
      "provider": {
        "@type": "Organization",
        "name": "Rocket JLPT",
        "url": "https://rocketjlpt.com"
      },
      "educationalLevel": `JLPT ${level}`,
      "inLanguage": "ja",
      "about": {
        "@type": "Thing",
        "name": "Japanese Grammar"
      },
      "numberOfItems": grammarList.length,
      "url": pageUrl
    };

    // Remove old structured data
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
    oldScripts.forEach(s => s.remove());

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [level, grammarList.length, info]);

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
                <span className="text-gray-900">JLPT {level} Grammar</span>
              </div>
              
              {/* Title with gradient accent */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {level} Grammar
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                    {filteredGrammar.length} patterns
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  {info?.description}
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by pattern or meaning..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading grammar...</p>
          </div>
        )}

        {/* Grammar Cards */}
        {!loading && grammarList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGrammar.map((grammar) => (
              <div
                key={grammar.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-200 p-6 group"
              >
                {/* Pattern with gradient background */}
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-50 to-orange-50 rounded-md mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 font-japanese">
                      {grammar.pattern}
                    </h3>
                  </div>
                  <p className="text-sm text-pink-600 font-medium">
                    {grammar.meaning}
                  </p>
                </div>

                {/* Usage */}
                <p className="text-sm text-gray-600 mb-4">
                  {grammar.usage}
                </p>

                {/* Example */}
                <div className="bg-gradient-to-br from-gray-50 to-pink-50/30 rounded-lg p-3 border border-gray-100">
                  <p className="text-base text-gray-900 mb-1 font-japanese">
                    {grammar.example}
                  </p>
                  <p className="text-xs text-gray-500">
                    {grammar.exampleTranslation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coming Soon State */}
        {!loading && grammarList.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-2">Grammar patterns coming soon</p>
            <p className="text-gray-400">We're working on adding {level} grammar patterns</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && grammarList.length > 0 && filteredGrammar.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No grammar patterns found</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Start learning today
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Master JLPT {level} grammar with interactive exercises and real-world examples
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href={`/jlpt/${level.toLowerCase()}`}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-pink-500 hover:text-pink-600 transition-all duration-200"
              >
                View All {level} Content
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
