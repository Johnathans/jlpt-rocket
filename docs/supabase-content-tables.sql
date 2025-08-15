-- JLPT Rocket Content Tables Setup
-- Run these SQL commands in your Supabase SQL editor

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
    word VARCHAR(100) NOT NULL,
    reading VARCHAR(100) NOT NULL, -- Hiragana/katakana reading
    meaning TEXT NOT NULL, -- English meaning
    part_of_speech VARCHAR(50), -- noun, verb, adjective, etc.
    jlpt_level jlpt_level NOT NULL,
    frequency_rank INTEGER, -- Frequency ranking (lower = more common)
    kanji_used TEXT[], -- Array of kanji characters used in this word
    example_sentence TEXT, -- Example sentence in Japanese
    example_translation TEXT, -- English translation of example
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(word, reading) -- Prevent duplicate word/reading combinations
);

-- Sentences table
CREATE TABLE sentences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    japanese_text TEXT NOT NULL,
    english_translation TEXT NOT NULL,
    jlpt_level jlpt_level NOT NULL,
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5), -- 1=easiest, 5=hardest
    grammar_points TEXT[], -- Array of grammar patterns used
    vocabulary_used TEXT[], -- Array of vocabulary words used
    kanji_used TEXT[], -- Array of kanji characters used
    audio_url TEXT, -- URL to audio file if available
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

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kanji_updated_at BEFORE UPDATE ON kanji
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vocabulary_updated_at BEFORE UPDATE ON vocabulary
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sentences_updated_at BEFORE UPDATE ON sentences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;

-- Allow all users to read content (public access for learning content)
CREATE POLICY "Allow public read access on kanji" ON kanji
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on vocabulary" ON vocabulary
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on sentences" ON sentences
    FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete (for admin purposes)
CREATE POLICY "Allow authenticated users to manage kanji" ON kanji
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage vocabulary" ON vocabulary
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage sentences" ON sentences
    FOR ALL USING (auth.role() = 'authenticated');

-- Sample data insertion (you can modify these examples)
INSERT INTO kanji (character, meaning, on_reading, kun_reading, jlpt_level, frequency_rank, stroke_count, radical) VALUES
('学', 'study, learning', ARRAY['ガク'], ARRAY['まな.ぶ'], 'N5', 1, 8, '子'),
('校', 'school', ARRAY['コウ'], ARRAY[]::TEXT[], 'N5', 2, 10, '木'),
('天', 'heaven, sky', ARRAY['テン'], ARRAY['あま', 'あめ'], 'N5', 3, 4, '大'),
('気', 'spirit, mood', ARRAY['キ', 'ケ'], ARRAY[]::TEXT[], 'N5', 4, 6, '气'),
('映', 'reflect, projection', ARRAY['エイ'], ARRAY['うつ.る', 'うつ.す', 'は.える'], 'N4', 5, 9, '日'),
('画', 'picture, drawing', ARRAY['ガ'], ARRAY[]::TEXT[], 'N4', 6, 8, '田');

INSERT INTO vocabulary (word, reading, meaning, part_of_speech, jlpt_level, frequency_rank, kanji_used, example_sentence, example_translation) VALUES
('学校', 'がっこう', 'school', 'noun', 'N5', 1, ARRAY['学', '校'], '私は毎日学校に行きます。', 'I go to school every day.'),
('天気', 'てんき', 'weather', 'noun', 'N5', 2, ARRAY['天', '気'], '今日は天気がいいですね。', 'The weather is nice today, isn''t it?'),
('映画', 'えいが', 'movie', 'noun', 'N5', 3, ARRAY['映', '画'], '友達と映画を見ました。', 'I watched a movie with my friend.'),
('新しい', 'あたらしい', 'new', 'i-adjective', 'N5', 4, ARRAY['新'], '新しい本を買いました。', 'I bought a new book.'),
('電車', 'でんしゃ', 'train', 'noun', 'N5', 5, ARRAY['電', '車'], '電車で会社に行きます。', 'I go to the company by train.');

INSERT INTO sentences (japanese_text, english_translation, jlpt_level, difficulty_level, grammar_points, vocabulary_used, kanji_used, audio_url) VALUES
('私は毎日*学校*に行きます。', 'I go to school every day.', 'N5', 1, ARRAY['present tense', 'に particle'], ARRAY['学校', '毎日', '行く'], ARRAY['私', '毎', '日', '学', '校', '行'], null),
('*友達*と映画を見ました。', 'I watched a movie with my friend.', 'N5', 2, ARRAY['past tense', 'と particle', 'を particle'], ARRAY['友達', '映画', '見る'], ARRAY['友', '達', '映', '画', '見'], null),
('今日は*天気*がいいです。', 'The weather is nice today.', 'N5', 1, ARRAY['い-adjective', 'が particle'], ARRAY['今日', '天気', 'いい'], ARRAY['今', '日', '天', '気'], null),
('新しい本を買いました。', 'I bought a new book.', 'N5', 1, ARRAY['い-adjective', 'を particle', 'ました form'], ARRAY['新しい', '本', '買う'], ARRAY['新', '本', '買'], null),
('電車で会社に行きます。', 'I go to the company by train.', 'N5', 2, ARRAY['で particle', 'に particle', 'ます form'], ARRAY['電車', '会社', '行く'], ARRAY['電', '車', '会', '社', '行'], null);

-- Views for easier querying by JLPT level
CREATE VIEW kanji_by_level AS
SELECT jlpt_level, COUNT(*) as count, ARRAY_AGG(character ORDER BY frequency_rank) as characters
FROM kanji 
GROUP BY jlpt_level 
ORDER BY jlpt_level DESC;

CREATE VIEW vocabulary_by_level AS
SELECT jlpt_level, COUNT(*) as count, ARRAY_AGG(word ORDER BY frequency_rank) as words
FROM vocabulary 
GROUP BY jlpt_level 
ORDER BY jlpt_level DESC;

CREATE VIEW sentences_by_level AS
SELECT jlpt_level, COUNT(*) as count, AVG(difficulty_level) as avg_difficulty
FROM sentences 
GROUP BY jlpt_level 
ORDER BY jlpt_level DESC;

-- Function to get random content by JLPT level
CREATE OR REPLACE FUNCTION get_random_kanji(level jlpt_level, limit_count INTEGER DEFAULT 10)
RETURNS TABLE(kanji_character VARCHAR, meaning TEXT, on_reading TEXT[], kun_reading TEXT[]) AS $$
BEGIN
    RETURN QUERY
    SELECT k.character, k.meaning, k.on_reading, k.kun_reading
    FROM kanji k
    WHERE k.jlpt_level = level
    ORDER BY RANDOM()
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_random_vocabulary(level jlpt_level, limit_count INTEGER DEFAULT 10)
RETURNS TABLE(word VARCHAR, reading VARCHAR, meaning TEXT, part_of_speech VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT v.word, v.reading, v.meaning, v.part_of_speech
    FROM vocabulary v
    WHERE v.jlpt_level = level
    ORDER BY RANDOM()
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_random_sentences(level jlpt_level, limit_count INTEGER DEFAULT 5)
RETURNS TABLE(japanese_text TEXT, english_translation TEXT, difficulty_level INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT s.japanese_text, s.english_translation, s.difficulty_level
    FROM sentences s
    WHERE s.jlpt_level = level
    ORDER BY RANDOM()
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
