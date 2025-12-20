const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const testGrammarPatterns = ['です', 'を', '～ている', '～たいです', 'と'];

async function generateSentenceWithOpenAI(grammarPattern) {
  const prompt = `You are a Japanese language teacher creating natural, authentic JLPT N5 sentences that students would actually encounter.

Grammar pattern to use: ${grammarPattern}

Create ONE natural Japanese sentence that:
- Uses the grammar pattern "${grammarPattern}" correctly
- Uses only N5-level vocabulary and kanji (N4 is acceptable if it makes the sentence more natural)
- Is something a beginner would actually say or hear in real life
- Sounds natural to a native speaker
- Is about common daily life topics (food, family, school, hobbies, weather, time, etc.)

Good examples of natural N5 sentences:
- 今日は暑いです。 (It's hot today.)
- 毎朝パンを食べます。 (I eat bread every morning.)
- 友達と映画を見ました。 (I watched a movie with my friend.)
- 日本語を勉強しています。 (I'm studying Japanese.)
- 週末に買い物に行きます。 (I'll go shopping on the weekend.)

Avoid:
- Unnatural combinations (like "blue dog" or "blue foot")
- Forcing specific vocabulary unnaturally
- Overly complex or rare situations
- Sentences that sound like textbook exercises

Respond ONLY with valid JSON in this exact format:
{
  "japanese": "your natural Japanese sentence",
  "english": "accurate, natural English translation",
  "vocabulary_used": ["word1", "word2"],
  "grammar_points": ["${grammarPattern}"],
  "difficulty": 1
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Japanese language expert. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const response = completion.choices[0].message.content.trim();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const sentenceData = JSON.parse(jsonMatch[0]);
    const kanjiUsed = (sentenceData.japanese.match(/[一-龯]/g) || []);
    const uniqueKanji = [...new Set(kanjiUsed)];
    
    return {
      id: uuidv4(),
      japanese_text: sentenceData.japanese,
      english_translation: sentenceData.english,
      jlpt_level: 'N5',
      difficulty_level: sentenceData.difficulty || 2,
      grammar_points: sentenceData.grammar_points || [grammarPattern],
      vocabulary_used: sentenceData.vocabulary_used || [],
      kanji_used: uniqueKanji,
      audio_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error:`, error.message);
    return null;
  }
}

async function testGeneration() {
  console.log('=== Testing GPT-4-turbo Sentence Generation ===\n');
  console.log('Generating 5 test sentences...\n');
  
  for (let i = 0; i < testGrammarPatterns.length; i++) {
    const pattern = testGrammarPatterns[i];
    console.log(`${i + 1}. Testing grammar pattern: ${pattern}`);
    
    const sentence = await generateSentenceWithOpenAI(pattern);
    
    if (sentence) {
      console.log(`   Japanese: ${sentence.japanese_text}`);
      console.log(`   English:  ${sentence.english_translation}`);
      console.log(`   Vocab:    ${sentence.vocabulary_used.join(', ')}`);
      console.log(`   Kanji:    ${sentence.kanji_used.join(', ')}\n`);
    } else {
      console.log(`   ✗ Failed\n`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('=== Test Complete ===');
  console.log('Review the sentences above. If they look good, run the full generation script.');
}

testGeneration().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
