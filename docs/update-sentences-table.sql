-- Update Sentences Table with Asterisk-Based Cloze Format
-- Run this in your Supabase SQL Editor

-- Clear existing sentences data
DELETE FROM sentences;

-- Insert sentences with asterisk-marked cloze words
INSERT INTO sentences (japanese_text, english_translation, jlpt_level, difficulty_level, grammar_points, vocabulary_used, kanji_used, audio_url) VALUES
('私は毎日*学校*に行きます。', 'I go to school every day.', 'N5', 1, ARRAY['は particle', 'に particle', 'ます form'], ARRAY['私', '毎日', '学校', '行く'], ARRAY['私', '毎', '日', '学', '校', '行'], null),
('今日は*天気*がいいですね。', 'The weather is nice today, isn''t it?', 'N5', 1, ARRAY['は particle', 'が particle', 'ですね'], ARRAY['今日', '天気', 'いい'], ARRAY['今', '日', '天', '気'], null),
('*友達*と映画を見ました。', 'I watched a movie with my friend.', 'N5', 2, ARRAY['と particle', 'を particle', 'ました form'], ARRAY['友達', '映画', '見る'], ARRAY['友', '達', '映', '画', '見'], null),
('新しい*本*を買いました。', 'I bought a new book.', 'N5', 1, ARRAY['い-adjective', 'を particle', 'ました form'], ARRAY['新しい', '本', '買う'], ARRAY['新', '本', '買'], null),
('*電車*で会社に行きます。', 'I go to the company by train.', 'N5', 2, ARRAY['で particle', 'に particle', 'ます form'], ARRAY['電車', '会社', '行く'], ARRAY['電', '車', '会', '社', '行'], null),
('昨日は*雨*が降りました。', 'It rained yesterday.', 'N5', 2, ARRAY['は particle', 'が particle', 'ました form'], ARRAY['昨日', '雨', '降る'], ARRAY['昨', '日', '雨', '降'], null),
('母は*料理*が上手です。', 'My mother is good at cooking.', 'N4', 3, ARRAY['は particle', 'が particle', 'な-adjective'], ARRAY['母', '料理', '上手'], ARRAY['母', '料', '理', '上', '手'], null),
('*図書館*で本を読みます。', 'I read books at the library.', 'N4', 2, ARRAY['で particle', 'を particle', 'ます form'], ARRAY['図書館', '本', '読む'], ARRAY['図', '書', '館', '本', '読'], null),
('来年*日本*に行く予定です。', 'I plan to go to Japan next year.', 'N4', 4, ARRAY['に particle', 'dictionary form', '予定'], ARRAY['来年', '日本', '行く', '予定'], ARRAY['来', '年', '日', '本', '行', '予', '定'], null),
('この*問題*は難しいです。', 'This problem is difficult.', 'N4', 3, ARRAY['この', 'は particle', 'い-adjective'], ARRAY['問題', '難しい'], ARRAY['問', '題', '難'], null),
('彼は*経験*が豊富です。', 'He has a lot of experience.', 'N3', 4, ARRAY['は particle', 'が particle', 'な-adjective'], ARRAY['彼', '経験', '豊富'], ARRAY['彼', '経', '験', '豊', '富'], null),
('*会議*の時間を変更しました。', 'I changed the meeting time.', 'N3', 5, ARRAY['の particle', 'を particle', 'ました form'], ARRAY['会議', '時間', '変更'], ARRAY['会', '議', '時', '間', '変', '更'], null),
('この*技術*は将来有望です。', 'This technology is promising for the future.', 'N2', 6, ARRAY['は particle', 'な-adjective'], ARRAY['技術', '将来', '有望'], ARRAY['技', '術', '将', '来', '有', '望'], null),
('*環境*問題について話し合いました。', 'We discussed environmental issues.', 'N2', 7, ARRAY['について', 'ました form'], ARRAY['環境', '問題', '話し合う'], ARRAY['環', '境', '問', '題', '話', '合'], null),
('この*政策*は効果的だと思います。', 'I think this policy is effective.', 'N1', 8, ARRAY['は particle', 'だと思う', 'な-adjective'], ARRAY['政策', '効果的', '思う'], ARRAY['政', '策', '効', '果', '的', '思'], null);

-- Verify the data was inserted correctly
SELECT id, japanese_text, english_translation, jlpt_level FROM sentences ORDER BY jlpt_level, difficulty_level;
