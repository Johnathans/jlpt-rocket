// N5 Sentence Templates
// Based on 40 grammar patterns from app/jlpt/[level]/grammar/page.tsx

module.exports = {
  templates: [
    // 1. です - to be (polite)
    {
      id: 'n5_desu_1',
      grammarPattern: 'です',
      template: '{subject}は{noun}です。',
      slots: {
        subject: ['私', 'これ', 'それ', 'あれ', '友達', '先生', '彼', '彼女'],
        noun: ['学生', '先生', '日本人', '本', 'ペン', '机', '椅子', '犬', '猫']
      },
      englishTemplate: '{subject} is {noun}.',
      difficulty: 1
    },
    {
      id: 'n5_desu_2',
      grammarPattern: 'です',
      template: '{subject}は{adjective}です。',
      slots: {
        subject: ['今日', '天気', 'この本', 'その映画', '部屋'],
        adjective: ['いい', '暑い', '寒い', '面白い', '難しい', '簡単', '新しい', '古い']
      },
      englishTemplate: '{subject} is {adjective}.',
      difficulty: 1
    },

    // 2. も - also, too
    {
      id: 'n5_mo_1',
      grammarPattern: 'も',
      template: '{person1}は{thing}が好きです。{person2}も{thing}が好きです。',
      slots: {
        person1: ['私', '友達', '先生', '田中さん'],
        person2: ['私', '友達', '母', '父', '兄', '姉'],
        thing: ['サッカー', '音楽', '映画', '本', '料理', 'テニス']
      },
      englishTemplate: '{person1} likes {thing}. {person2} also likes {thing}.',
      difficulty: 1
    },

    // 3. で - at, by, with
    {
      id: 'n5_de_1',
      grammarPattern: 'で',
      template: '{place}で{action}。',
      slots: {
        place: ['学校', '図書館', '公園', 'レストラン', '家', '駅'],
        action: ['勉強します', '本を読みます', '友達と話します', '食べます', '待ちます']
      },
      englishTemplate: '{action} at {place}.',
      difficulty: 1
    },
    {
      id: 'n5_de_2',
      grammarPattern: 'で',
      template: '{tool}で{action}。',
      slots: {
        tool: ['ペン', '箸', 'バス', '電車', '自転車'],
        action: ['書きます', '食べます', '行きます', '来ます']
      },
      englishTemplate: '{action} with/by {tool}.',
      difficulty: 1
    },

    // 4. に/へ - to, towards
    {
      id: 'n5_ni_he_1',
      grammarPattern: 'に/へ',
      template: '{time}に{place}に行きます。',
      slots: {
        time: ['明日', '今日', '毎日', '来週', '来月'],
        place: ['学校', '図書館', '公園', '東京', '日本', '会社']
      },
      englishTemplate: 'Go to {place} {time}.',
      difficulty: 1
    },

    // 5. に - at, on, in (time)
    {
      id: 'n5_ni_time_1',
      grammarPattern: 'に',
      template: '{time}に{action}。',
      slots: {
        time: ['7時', '8時', '朝', '夜', '月曜日', '日曜日'],
        action: ['起きます', '寝ます', '食べます', '勉強します', '働きます']
      },
      englishTemplate: '{action} at {time}.',
      difficulty: 1
    },

    // 6. を - object marker
    {
      id: 'n5_wo_1',
      grammarPattern: 'を',
      template: '{object}を{action}。',
      slots: {
        object: ['本', '映画', '音楽', 'ご飯', '水', 'コーヒー', '宿題'],
        action: ['読みます', '見ます', '聞きます', '食べます', '飲みます', 'します']
      },
      englishTemplate: '{action} {object}.',
      difficulty: 1
    },

    // 7. ～ませんか - won't you...?
    {
      id: 'n5_masenka_1',
      grammarPattern: '～ませんか',
      template: '一緒に{action}ませんか。',
      slots: {
        action: ['行き', '食べ', '見', '勉強し', '遊び', '話し']
      },
      englishTemplate: 'Won\'t you {action} together?',
      difficulty: 2
    },

    // 8. は - topic marker
    {
      id: 'n5_wa_1',
      grammarPattern: 'は',
      template: '{topic}は{description}です。',
      slots: {
        topic: ['私', '田中さん', 'この本', 'その映画', '東京'],
        description: ['学生', '先生', '面白い', '大きい', '有名']
      },
      englishTemplate: 'As for {topic}, {description}.',
      difficulty: 1
    },

    // 9. ～があります - there is (inanimate)
    {
      id: 'n5_ga_arimasu_1',
      grammarPattern: '～があります',
      template: '{place}に{thing}があります。',
      slots: {
        place: ['机の上', '部屋', '冷蔵庫', '箱の中', 'かばんの中'],
        thing: ['本', 'ペン', '食べ物', '水', 'りんご', 'ノート']
      },
      englishTemplate: 'There is {thing} in/on {place}.',
      difficulty: 2
    },

    // 10. ～がいます - there is (animate)
    {
      id: 'n5_ga_imasu_1',
      grammarPattern: '～がいます',
      template: '{place}に{person}がいます。',
      slots: {
        place: ['部屋', '学校', '公園', '図書館', '家'],
        person: ['人', '友達', '先生', '学生', '子供', '犬', '猫']
      },
      englishTemplate: 'There is {person} in {place}.',
      difficulty: 2
    },

    // 11. と - and, with
    {
      id: 'n5_to_1',
      grammarPattern: 'と',
      template: '{person}と{action}。',
      slots: {
        person: ['友達', '母', '父', '先生', '田中さん'],
        action: ['映画を見ます', '話します', '遊びます', '勉強します', '食べます']
      },
      englishTemplate: '{action} with {person}.',
      difficulty: 1
    },
    {
      id: 'n5_to_2',
      grammarPattern: 'と',
      template: '{item1}と{item2}を買いました。',
      slots: {
        item1: ['りんご', 'パン', '本', 'ペン', '牛乳'],
        item2: ['バナナ', 'ケーキ', 'ノート', '消しゴム', 'ジュース']
      },
      englishTemplate: 'Bought {item1} and {item2}.',
      difficulty: 1
    },

    // 12. ～ましょう - let's...
    {
      id: 'n5_mashou_1',
      grammarPattern: '～ましょう',
      template: '一緒に{action}ましょう。',
      slots: {
        action: ['食べ', '行き', '勉強し', '遊び', '見', '話し']
      },
      englishTemplate: 'Let\'s {action} together.',
      difficulty: 1
    },

    // 13. ～ましょうか - shall we...?
    {
      id: 'n5_mashouka_1',
      grammarPattern: '～ましょうか',
      template: '{action}ましょうか。',
      slots: {
        action: ['休み', '始め', '帰り', '食べ', '行き']
      },
      englishTemplate: 'Shall we {action}?',
      difficulty: 2
    },

    // 14. ～てください - please do...
    {
      id: 'n5_tekudasai_1',
      grammarPattern: '～てください',
      template: '{action}てください。',
      slots: {
        action: ['待っ', '来', '見', '聞い', '話し', '座っ', '立っ']
      },
      englishTemplate: 'Please {action}.',
      difficulty: 2
    },

    // 15. ～てもいいです - it's okay to...
    {
      id: 'n5_temoii_1',
      grammarPattern: '～てもいいです',
      template: '{action}てもいいですか。',
      slots: {
        action: ['入っ', '座っ', '食べ', '飲ん', '見', '使っ']
      },
      englishTemplate: 'May I {action}?',
      difficulty: 2
    },

    // 16. ～てはいけません - must not...
    {
      id: 'n5_tewaikemasen_1',
      grammarPattern: '～てはいけません',
      template: 'ここで{action}てはいけません。',
      slots: {
        action: ['食べ', '飲ん', '話し', '走っ', '遊ん']
      },
      englishTemplate: 'You must not {action} here.',
      difficulty: 2
    },

    // 17. ～から - because, from
    {
      id: 'n5_kara_1',
      grammarPattern: '～から',
      template: '{reason}から{result}。',
      slots: {
        reason: ['忙しい', '疲れた', '時間がない', '雨'],
        result: ['行けません', '休みます', '帰ります', '中止です']
      },
      englishTemplate: '{result} because {reason}.',
      difficulty: 2
    },

    // 18. ～ている - is doing, is in a state
    {
      id: 'n5_teiru_1',
      grammarPattern: '～ている',
      template: '今、{action}ています。',
      slots: {
        action: ['勉強し', '食べ', '見', '読ん', '書い', '話し']
      },
      englishTemplate: 'Now {action}ing.',
      difficulty: 2
    },

    // 19. ～にいく - go to do...
    {
      id: 'n5_niiku_1',
      grammarPattern: '～にいく',
      template: '{purpose}に行きます。',
      slots: {
        purpose: ['買い物', '映画を見', '勉強し', '遊び', '食べ']
      },
      englishTemplate: 'Go to {purpose}.',
      difficulty: 2
    },

    // 20. ないでください - please don't...
    {
      id: 'n5_naidekudasai_1',
      grammarPattern: 'ないでください',
      template: '{action}ないでください。',
      slots: {
        action: ['心配し', '忘れ', '遅れ', '話し', '触ら']
      },
      englishTemplate: 'Please don\'t {action}.',
      difficulty: 2
    },

    // 21. ～のがすきです - like doing...
    {
      id: 'n5_nogasuki_1',
      grammarPattern: '～のがすきです',
      template: '{activity}のが好きです。',
      slots: {
        activity: ['音楽を聞く', '本を読む', '映画を見る', '料理を作る', '走る']
      },
      englishTemplate: 'Like {activity}.',
      difficulty: 2
    },

    // 22. ～のがじょうずです - good at...
    {
      id: 'n5_nogajouzu_1',
      grammarPattern: '～のがじょうずです',
      template: '{activity}のが上手です。',
      slots: {
        activity: ['日本語を話す', '料理を作る', 'ピアノを弾く', '絵を描く', '歌う']
      },
      englishTemplate: 'Good at {activity}.',
      difficulty: 2
    },

    // 23. ～のがへたです - bad at...
    {
      id: 'n5_nogaheta_1',
      grammarPattern: '～のがへたです',
      template: '{activity}のが下手です。',
      slots: {
        activity: ['料理を作る', '歌う', '絵を描く', '泳ぐ', '運転する']
      },
      englishTemplate: 'Bad at {activity}.',
      difficulty: 2
    },

    // 24. まだ～ていません - not yet...
    {
      id: 'n5_madateimasen_1',
      grammarPattern: 'まだ～ていません',
      template: 'まだ{action}ていません。',
      slots: {
        action: ['食べ', '見', '読ん', '行っ', 'し']
      },
      englishTemplate: 'Haven\'t {action} yet.',
      difficulty: 2
    },

    // 25. ～のほうが～より - ... is more than...
    {
      id: 'n5_nohouga_1',
      grammarPattern: '～のほうが～より',
      template: '{item1}のほうが{item2}より{adjective}です。',
      slots: {
        item1: ['夏', '冬', '東京', '犬', 'りんご'],
        item2: ['冬', '夏', '大阪', '猫', 'バナナ'],
        adjective: ['好き', '暑い', '寒い', '大きい', '小さい']
      },
      englishTemplate: '{item1} is more {adjective} than {item2}.',
      difficulty: 3
    },

    // 26. ～のなかで～がいちばん～ - ... is the most...
    {
      id: 'n5_nonakade_1',
      grammarPattern: '～のなかで～がいちばん～',
      template: '{category}の中で{item}が一番{adjective}です。',
      slots: {
        category: ['日本', '季節', 'スポーツ', '食べ物', '科目'],
        item: ['東京', '夏', 'サッカー', 'ラーメン', '数学'],
        adjective: ['大きい', '好き', '面白い', 'おいしい', '難しい']
      },
      englishTemplate: '{item} is the most {adjective} in {category}.',
      difficulty: 3
    },

    // 27. つもりです - intend to...
    {
      id: 'n5_tsumori_1',
      grammarPattern: 'つもりです',
      template: '{time}{action}つもりです。',
      slots: {
        time: ['明日', '来週', '来月', '来年', '今日'],
        action: ['行く', '勉強する', '買う', '会う', '始める']
      },
      englishTemplate: 'Intend to {action} {time}.',
      difficulty: 2
    },

    // 28. ～く/～になる - become...
    {
      id: 'n5_kunaru_1',
      grammarPattern: '～く/～になる',
      template: '{adjective}くなりました。',
      slots: {
        adjective: ['暖か', '寒', '暑', '涼し', '明る', '暗']
      },
      englishTemplate: 'Became {adjective}.',
      difficulty: 2
    },

    // 29. stem +たいです - want to...
    {
      id: 'n5_tai_1',
      grammarPattern: 'stem +たいです',
      template: '{place}に{action}たいです。',
      slots: {
        place: ['日本', '東京', '学校', '図書館', '公園'],
        action: ['行き', '来', '帰り', '戻り']
      },
      englishTemplate: 'Want to {action} to {place}.',
      difficulty: 2
    },
    {
      id: 'n5_tai_2',
      grammarPattern: 'stem +たいです',
      template: '{object}を{action}たいです。',
      slots: {
        object: ['映画', '本', 'ラーメン', 'ケーキ', '音楽'],
        action: ['見', '読み', '食べ', '聞き', '買い']
      },
      englishTemplate: 'Want to {action} {object}.',
      difficulty: 2
    },

    // 30. ～たり…～たりする - do things like... and...
    {
      id: 'n5_tari_1',
      grammarPattern: '～たり…～たりする',
      template: '{action1}たり、{action2}たりします。',
      slots: {
        action1: ['本を読ん', '音楽を聞い', '映画を見', '勉強し'],
        action2: ['音楽を聞い', '映画を見', 'テレビを見', '遊ん']
      },
      englishTemplate: 'Do things like {action1} and {action2}.',
      difficulty: 3
    },

    // 31. ～たことがある - have done... before
    {
      id: 'n5_takotogaaru_1',
      grammarPattern: '～たことがある',
      template: '{place}に{action}たことがあります。',
      slots: {
        place: ['日本', '東京', '京都', '大阪', 'アメリカ'],
        action: ['行っ', '住ん', '旅行し']
      },
      englishTemplate: 'Have {action} to {place} before.',
      difficulty: 2
    },

    // 32. や - and (non-exhaustive)
    {
      id: 'n5_ya_1',
      grammarPattern: 'や',
      template: '{item1}や{item2}を買いました。',
      slots: {
        item1: ['りんご', 'パン', '本', 'ペン', '野菜'],
        item2: ['バナナ', 'ケーキ', 'ノート', '消しゴム', '果物']
      },
      englishTemplate: 'Bought {item1}, {item2}, and such.',
      difficulty: 2
    },

    // 33. ～んです - explanatory tone
    {
      id: 'n5_ndesu_1',
      grammarPattern: '～んです',
      template: '{reason}んです。',
      slots: {
        reason: ['忙しい', '疲れた', '時間がない', '分からない', '行けない']
      },
      englishTemplate: 'The thing is, {reason}.',
      difficulty: 3
    },

    // 34. ～すぎる - too much...
    {
      id: 'n5_sugiru_1',
      grammarPattern: '～すぎる',
      template: '{action}すぎました。',
      slots: {
        action: ['食べ', '飲み', '働き', '勉強し', '寝']
      },
      englishTemplate: '{action} too much.',
      difficulty: 2
    },

    // 35. ～ほうがいい - it's better to...
    {
      id: 'n5_hougaii_1',
      grammarPattern: '～ほうがいい',
      template: '{action}たほうがいいです。',
      slots: {
        action: ['早く寝', '休ん', '勉強し', '食べ', '行っ']
      },
      englishTemplate: 'It\'s better to {action}.',
      difficulty: 2
    },

    // 36. ので - because, since
    {
      id: 'n5_node_1',
      grammarPattern: 'ので',
      template: '{reason}ので{result}。',
      slots: {
        reason: ['雨', '忙しい', '疲れた', '時間がない'],
        result: ['行きません', '休みます', '帰ります', 'できません']
      },
      englishTemplate: '{result} because {reason}.',
      difficulty: 2
    },

    // 37. ～なくちゃいけない - must...
    {
      id: 'n5_nakucha_1',
      grammarPattern: '～なくちゃいけない',
      template: '{action}なくちゃいけない。',
      slots: {
        action: ['宿題をし', '勉強し', '行か', '起き', '食べ']
      },
      englishTemplate: 'Must {action}.',
      difficulty: 2
    },

    // 38. でしょう - probably, right?
    {
      id: 'n5_deshou_1',
      grammarPattern: 'でしょう',
      template: '明日は{weather}でしょう。',
      slots: {
        weather: ['晴れる', '雨', '曇り', '暑い', '寒い']
      },
      englishTemplate: 'Tomorrow will probably be {weather}.',
      difficulty: 2
    },

    // 39. ～まえに - before...
    {
      id: 'n5_maeni_1',
      grammarPattern: '～まえに',
      template: '{action1}前に{action2}。',
      slots: {
        action1: ['寝る', '食べる', '出かける', '勉強する'],
        action2: ['歯を磨きます', '手を洗います', '準備します', '復習します']
      },
      englishTemplate: '{action2} before {action1}.',
      difficulty: 2
    },

    // 40. ～てから - after...
    {
      id: 'n5_tekara_1',
      grammarPattern: '～てから',
      template: '{action1}てから{action2}。',
      slots: {
        action1: ['食べ', '勉強し', '見', '読ん'],
        action2: ['行きます', '寝ます', '帰ります', '休みます']
      },
      englishTemplate: '{action2} after {action1}.',
      difficulty: 2
    }
  ]
};
