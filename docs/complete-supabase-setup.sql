-- COMPLETE JLPT Rocket Supabase Database Setup
-- Run this entire script in your Supabase SQL Editor

-- Drop existing tables if they exist (optional - only if you want to start fresh)
DROP TABLE IF EXISTS sentences CASCADE;
DROP TABLE IF EXISTS vocabulary CASCADE;
DROP TABLE IF EXISTS kanji CASCADE;
DROP TYPE IF EXISTS jlpt_level CASCADE;

-- Create JLPT levels enum for consistency
CREATE TYPE jlpt_level AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');

-- Kanji table
CREATE TABLE kanji (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    character VARCHAR(10) NOT NULL UNIQUE, -- The kanji character itself
    meaning TEXT NOT NULL, -- English meaning
    on_reading TEXT[], -- Array of on'yomi readings
    kun_reading TEXT[], -- Array of kun'yomi readings
    jlpt_level jlpt_level NOT NULL,
    frequency_rank INTEGER, -- Frequency ranking (lower = more common)
    stroke_count INTEGER,
    radical VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vocabulary table
CREATE TABLE vocabulary (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    word VARCHAR(50) NOT NULL, -- The vocabulary word
    reading VARCHAR(100) NOT NULL, -- Hiragana/katakana reading
    meaning TEXT NOT NULL, -- English meaning
    part_of_speech VARCHAR(50), -- noun, verb, adjective, etc.
    jlpt_level jlpt_level NOT NULL,
    frequency_rank INTEGER, -- Frequency ranking
    kanji_used TEXT[], -- Array of kanji characters used in this word
    example_sentence TEXT, -- Example sentence using this word
    example_translation TEXT, -- English translation of example
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sentences table
CREATE TABLE sentences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    japanese_text TEXT NOT NULL, -- Japanese sentence with asterisk-marked cloze words
    english_translation TEXT NOT NULL, -- English translation
    jlpt_level jlpt_level NOT NULL,
    difficulty_level INTEGER DEFAULT 1, -- 1-10 difficulty scale
    grammar_points TEXT[], -- Array of grammar points covered
    vocabulary_used TEXT[], -- Array of vocabulary words used
    kanji_used TEXT[], -- Array of kanji characters used
    audio_url TEXT, -- Optional audio file URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_kanji_jlpt_level ON kanji(jlpt_level);
CREATE INDEX idx_kanji_frequency ON kanji(frequency_rank);
CREATE INDEX idx_vocabulary_jlpt_level ON vocabulary(jlpt_level);
CREATE INDEX idx_vocabulary_frequency ON vocabulary(frequency_rank);
CREATE INDEX idx_sentences_jlpt_level ON sentences(jlpt_level);
CREATE INDEX idx_sentences_difficulty ON sentences(difficulty_level);

-- Enable Row Level Security (RLS)
ALTER TABLE kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on kanji" ON kanji FOR SELECT USING (true);
CREATE POLICY "Allow public read access on vocabulary" ON vocabulary FOR SELECT USING (true);
CREATE POLICY "Allow public read access on sentences" ON sentences FOR SELECT USING (true);

-- Create policies to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to modify kanji" ON kanji FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify vocabulary" ON vocabulary FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify sentences" ON sentences FOR ALL USING (auth.role() = 'authenticated');

-- Sample data insertion
INSERT INTO kanji (character, meaning, on_reading, kun_reading, jlpt_level, frequency_rank, stroke_count, radical) VALUES
('学', 'study, learning', ARRAY['ガク'], ARRAY['まな.ぶ'], 'N5', 1, 8, '子'),
('校', 'school', ARRAY['コウ'], ARRAY[]::TEXT[], 'N5', 2, 10, '木'),
('天', 'heaven, sky', ARRAY['テン'], ARRAY['あま', 'あめ'], 'N5', 3, 4, '大'),
('気', 'spirit, mood', ARRAY['キ', 'ケ'], ARRAY[]::TEXT[], 'N5', 4, 6, '气'),
('映', 'reflect, projection', ARRAY['エイ'], ARRAY['うつ.る', 'うつ.す', 'は.える'], 'N4', 5, 9, '日'),
('画', 'picture, drawing', ARRAY['ガ'], ARRAY[]::TEXT[], 'N4', 6, 8, '田');

INSERT INTO vocabulary (word, reading, meaning, part_of_speech, jlpt_level, frequency_rank, kanji_used, example_sentence, example_translation) VALUES
('学校', 'がっこう', 'school', 'noun', 'N5', 1, ARRAY['学', '校'], '私は毎日学校に行きます。', 'I go to school every day.'),
('天気', 'てんき', 'weather', 'noun', 'N5', 2, ARRAY['天', '気'], '今日は天気がいいです。', 'The weather is nice today.'),
('友達', 'ともだち', 'friend', 'noun', 'N5', 3, ARRAY['友', '達'], '友達と映画を見ました。', 'I watched a movie with my friend.'),
('新しい', 'あたらしい', 'new', 'i-adjective', 'N5', 4, ARRAY['新'], '新しい本を買いました。', 'I bought a new book.'),
('電車', 'でんしゃ', 'train', 'noun', 'N5', 5, ARRAY['電', '車'], '電車で会社に行きます。', 'I go to the company by train.');

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

-- Views for easier querying by JLPT level
CREATE VIEW kanji_by_level AS
SELECT jlpt_level, COUNT(*) as count, array_agg(character ORDER BY frequency_rank) as characters
FROM kanji 
GROUP BY jlpt_level 
ORDER BY jlpt_level DESC;

CREATE VIEW vocabulary_by_level AS
SELECT jlpt_level, COUNT(*) as count, array_agg(word ORDER BY frequency_rank) as words
FROM vocabulary 
GROUP BY jlpt_level 
ORDER BY jlpt_level DESC;

CREATE VIEW sentences_by_level AS
SELECT jlpt_level, COUNT(*) as count, avg(difficulty_level) as avg_difficulty
FROM sentences 
GROUP BY jlpt_level 
ORDER BY jlpt_level DESC;

-- Helper functions for random content selection
CREATE OR REPLACE FUNCTION get_random_kanji_by_level(target_level jlpt_level, item_count INTEGER DEFAULT 10)
RETURNS TABLE(kanji_character VARCHAR, meaning TEXT, readings TEXT[]) AS $$
BEGIN
    RETURN QUERY
    SELECT character, kanji.meaning, array_cat(on_reading, kun_reading) as readings
    FROM kanji 
    WHERE jlpt_level = target_level 
    ORDER BY RANDOM() 
    LIMIT item_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_random_vocabulary_by_level(target_level jlpt_level, item_count INTEGER DEFAULT 10)
RETURNS TABLE(vocab_word VARCHAR, reading_text VARCHAR, meaning_text TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT word, reading, meaning
    FROM vocabulary 
    WHERE jlpt_level = target_level 
    ORDER BY RANDOM() 
    LIMIT item_count;
END;
$$ LANGUAGE plpgsql;

-- Verify the data was inserted correctly
SELECT COUNT(*) as kanji_count FROM kanji;
SELECT COUNT(*) as vocabulary_count FROM vocabulary;
SELECT COUNT(*) as sentences_count FROM sentences;

-- Show sample data
SELECT character, meaning FROM kanji LIMIT 3;
SELECT word, meaning FROM vocabulary LIMIT 3;
SELECT japanese_text, english_translation FROM sentences LIMIT 3;
