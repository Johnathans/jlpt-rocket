import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { word } = await request.json();
    
    if (!word) {
      return NextResponse.json({ error: 'Word parameter is required' }, { status: 400 });
    }

    console.log(`Dictionary lookup for: ${word}`);

    // Try to fetch from Jisho.org's unofficial API endpoint
    try {
      const jishoResponse = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`);
      
      if (jishoResponse.ok) {
        const jishoData = await jishoResponse.json();
        
        if (jishoData.data && jishoData.data.length > 0) {
          const entry = jishoData.data[0];
          const meanings = entry.senses
            .flatMap((sense: any) => sense.english_definitions)
            .slice(0, 3) // Take first 3 meanings
            .join(', ');
          
          console.log(`Jisho API found: ${meanings}`);
          return NextResponse.json({ 
            word, 
            meaning: meanings,
            source: 'jisho'
          });
        }
      }
    } catch (jishoError) {
      console.log('Jisho API failed, using fallback');
    }

    // Fallback dictionary for common words
    const fallbackDictionary: {[key: string]: string} = {
      // Basic words
      'ある': 'exist, be, have',
      'いる': 'be, exist (animate)',
      'する': 'do, make',
      'なる': 'become',
      'いう': 'say, speak',
      'くる': 'come',
      'いく': 'go',
      'みる': 'see, look',
      'きく': 'hear, listen, ask',
      'かく': 'write',
      'よむ': 'read',
      'たべる': 'eat',
      'のむ': 'drink',
      'ねる': 'sleep',
      'おきる': 'wake up, get up',
      
      // Story-specific vocabulary
      '村': 'village',
      '幸': 'happiness, fortune',
      '運': 'luck, fortune',
      '木': 'tree, wood',
      '古': 'old, ancient',
      '言': 'say, speak, word',
      '下': 'under, below',
      '願': 'wish, request',
      '必': 'certainly, must',
      '叶': 'grant, fulfill',
      '信': 'believe, trust',
      '人': 'person, people',
      '呼': 'call, name',
      '日': 'day, sun',
      '若': 'young, if',
      '女': 'woman, female',
      '性': 'nature, gender',
      '前': 'front, before',
      '立': 'stand, establish',
      '彼': 'he, that person',
      '深': 'deep, profound',
      '悲': 'sad, sorrow',
      '抱': 'embrace, hold',
      '家': 'house, family',
      '族': 'family, clan',
      '亡': 'die, lose',
      '一': 'one',
      '向': 'face, direction',
      '新': 'new, fresh',
      '数': 'number, count',
      '後': 'after, behind',
      '市': 'market, city',
      '場': 'place, field',
      '優': 'gentle, superior',
      '男': 'man, male',
      '出': 'exit, come out',
      '会': 'meet, association',
      '同': 'same, together',
      '二': 'two',
      '互': 'mutual, each other',
      '痛': 'pain, ache',
      '理': 'reason, logic',
      '解': 'understand, solve',
      '次': 'next, order',
      '第': 'order, sequence',
      '心': 'heart, mind',
      '通': 'pass through',
      '結': 'tie, connect, marry',
      '婚': 'marriage',
      '築': 'build, construct',
      '毎': 'every, each',
      '年': 'year',
      '感': 'feeling, emotion',
      '謝': 'thanks, gratitude',
      '祈': 'prayer, wish',
      '捧': 'offer, present',
      '今': 'now, present',
      '希': 'hope, rare',
      '望': 'hope, desire',
      '続': 'continue, follow',
      '勝': 'victory, win',
      '何': 'what, which',
      '度': 'time, degree',
      '受': 'receive, accept',
      '話': 'speak, talk, story',
      '器': 'device, vessel',
      '母': 'mother',
      '春': 'spring (season)',
      '江': 'river, inlet',
      '声': 'voice, sound',
      '聞': 'hear, listen, ask',
      '造': 'make, create',
      '渡': 'cross, hand over',
      '元': 'origin, source',
      '気': 'spirit, energy',
      '答': 'answer, reply',
      '腰': 'waist, lower back',
      '落': 'fall, drop',
      '着': 'arrive, wear',
      '寒': 'cold',
      '電': 'electricity',
      '覚': 'remember, wake up',
      '子': 'child',
      '配': 'distribute, worry',
      '大': 'big, large',
      '丈': 'height, strong',
      '夫': 'husband, man',
      '見': 'see, look',
      '合': 'meet, fit',
      '来': 'come, next',
      '身': 'body, oneself',
      '固': 'hard, solid',
      '思': 'think, consider',
      '早': 'early, fast',
      '孫': 'grandchild',
      '顔': 'face',
      '広': 'wide, broad',
      '美': 'beauty, beautiful',
      '時': 'time, when',
      '間': 'interval, space',
      '作': 'make, create',
      '切': 'cut, hang up',
      '窓': 'window',
      '外': 'outside, external',
      '考': 'think, consider'
    };

    const meaning = fallbackDictionary[word] || 'No translation found';
    console.log(`Fallback dictionary: ${meaning}`);
    
    return NextResponse.json({ 
      word, 
      meaning,
      source: 'fallback'
    });

  } catch (error) {
    console.error('Dictionary API error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup word meaning' }, 
      { status: 500 }
    );
  }
}
