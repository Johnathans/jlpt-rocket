// Complete N5 mnemonics - all 79 kanji with memorable mnemonics
const fs = require('fs');
const path = require('path');

const completeMnemonics = {
  '一': 'Just one single horizontal line - it\'s literally the number one lying down! Can\'t get simpler than that.',
  '二': 'Two horizontal lines stacked on top of each other - just like the number two! Count them: one, two.',
  '三': 'Three horizontal lines stacked up - count them: one, two, three! The pattern continues from one and two.',
  '四': 'A box with FOUR sides and FOUR corners - count each side: one, two, three, four!',
  '五': 'Looks like a fancy FIVE with crossed lines - imagine the Roman numeral V with extra decoration!',
  '六': 'A hat on top of legs - and a spider has SIX legs under its body (close enough to eight!).',
  '七': 'A horizontal line cut by a vertical slash - like cutting a cake into SEVEN pieces with one decisive cut!',
  '八': 'Two lines spreading apart like the number 8 split in half. Or think of it as two chopsticks - you need EIGHT fingers to use chopsticks properly!',
  '九': 'Looks like a muscular arm flexing - and you need NINE muscles to flex your arm that hard!',
  '十': 'A perfect plus (+) sign - and when you count on your TEN fingers, you\'re adding them all up!',
  '百': 'White (白) with an extra stroke - multiply white by ten to get a HUNDRED! One hundred is pure and complete.',
  '千': 'Ten (十) with an extra slash - multiply by 100 and you get a THOUSAND! The slash adds two zeros.',
  '万': 'One (一) with a fancy curl - multiply by TEN THOUSAND to make it super special and valuable!',
  '円': 'A rounded enclosure - it\'s literally shaped like a CIRCLE! Also means yen, the circular coins.',
  '人': 'Two legs walking - a simple stick figure person striding forward. The most basic representation of a human!',
  '入': 'An arrow pointing down and in - showing the direction to ENTER a building. Follow the arrow inside!',
  '出': 'Two mountains stacked - you EXIT by climbing up and over both peaks to get out!',
  '上': 'A short line sitting ABOVE a longer baseline - the top line is literally positioned above! The arrow points up.',
  '下': 'A short line hanging BELOW a longer top line - opposite of above! The arrow points down.',
  '中': 'A vertical line going through the middle of a box - the arrow pierces right IN the center! Bulls-eye!',
  '大': 'A person (人) spreading their arms and legs wide - making themselves as LARGE as possible! Think of a big starfish.',
  '小': 'A vertical line with two tiny dots on either side - the dots are so LITTLE and small compared to the center line!',
  '左': 'A hand (the left side) holding a carpenter\'s square - craftsmen hold tools in their LEFT hand to measure!',
  '右': 'A hand (the right side) reaching for your mouth (口) - most people eat with their RIGHT hand!',
  '前': 'A knife cutting forward - you cut what\'s IN FRONT of you, moving the blade ahead!',
  '後': 'Walking with a thread trailing BEHIND you - the thread follows after you, always behind your steps!',
  '外': 'An evening moon with a divination stick - fortune tellers work OUTSIDE under the moonlight!',
  '北': 'Two people (人人) sitting back-to-back - they\'re cold because they\'re facing NORTH where it\'s freezing!',
  '南': 'Ten (十) inside a building - it\'s warm in the SOUTH, so you can count to ten comfortably indoors!',
  '東': 'The sun (日) rising behind a tree (木) - the sun rises in the EAST every morning!',
  '西': 'A bird\'s nest - birds fly WEST at sunset to return to their nests for the night!',
  '日': 'Picture a window with the sun shining through it. The horizontal line is the windowsill, and the bright rectangle is sunlight streaming in - that\'s your day beginning!',
  '月': 'Two horizontal strokes are clouds in the night sky, and the two vertical strokes form a crescent moon peeking through. The moon\'s cycle gives us months!',
  '火': 'A person (人) dancing wildly with flames shooting up on both sides. Fire makes people jump and dance to avoid getting burned!',
  '水': 'The center vertical line is a stream of water flowing down, and the splashes on either side show water droplets bouncing off rocks. You can almost see it flowing!',
  '木': 'The horizontal line is the ground, the vertical line is the trunk, and the branches spread out on both sides. It\'s literally a simple tree drawing!',
  '森': 'Three trees (木木木) together make a forest. One tree is lonely, two is company, but three trees? That\'s a forest party!',
  '山': 'Three peaks of a mountain range! The middle peak is the tallest - just like Mt. Fuji with smaller peaks beside it.',
  '川': 'Three flowing lines of water running down a stream - you can see the current flowing between the banks!',
  '土': 'A plant sprouting from the ground - the horizontal line is the soil surface, and the stem grows up from the earth!',
  '天': 'A big (大) person with a line above their head - reaching up to the HEAVENS! The sky is the limit.',
  '雨': 'The top line is the sky, and the four dots below are raindrops falling down. It\'s literally a picture of rain falling from the clouds!',
  '電': 'Rain (雨) plus a rice field (田) equals electricity - because lightning strikes during rainstorms over fields, creating nature\'s electricity!',
  '金': 'A roof over precious nuggets - GOLD is so valuable it needs protection! Also means money/metal.',
  '白': 'The sun (日) with a drop on top - when the sun\'s rays hit a drop of water, it reflects pure WHITE light!',
  '本': 'A tree (木) with a horizontal line through it - ancient BOOKS were made from tree bark and wood!',
  '名': 'Evening (夕) mouth (口) - when it gets dark, you call out someone\'s NAME to find them!',
  '女': 'A woman kneeling gracefully with her arms crossed - a traditional pose showing elegance and poise.',
  '男': 'Strength (力) in the rice field (田) - MALES traditionally did the heavy farm work requiring physical power!',
  '子': 'A baby wrapped in a blanket with arms reaching up - a CHILD wanting to be picked up by their parent!',
  '母': 'Woman (女) with two dots - representing a MOTHER\'s breasts, nurturing and feeding her children.',
  '父': 'Two crossed lines - FATHER works hard, crossing his arms after a long day of providing for the family.',
  '友': 'Two hands reaching out to each other - FRIENDS shake hands and support one another!',
  '先': 'Legs walking forward - you must go BEFORE others, leading the way ahead!',
  '生': 'A plant sprouting from the earth - new LIFE growing from the soil! Also means birth/raw/student.',
  '年': 'A person carrying grain on their back - farmers harvest once a YEAR, marking the passage of time!',
  '今': 'An umbrella covering the present moment - you need it NOW, not later! Live in the present.',
  '午': 'A pestle pounding rice - farmers take their lunch break at NOON when the sun is highest!',
  '半': 'Eight (八) divided by a line - split it in HALF down the middle! Perfect division.',
  '時': 'Sun (日) at a temple - monks measure TIME by the sun\'s position, marking the hours of prayer!',
  '間': 'Sun (日) peeking through a gate - the INTERVAL of space between the doors lets sunlight through!',
  '毎': 'Mother (母) without the dots - EVERY mother loves their child, it\'s universal and constant!',
  '何': 'Person (人) with a mouth (口) asking questions - WHAT is this? WHAT is that? Always curious!',
  '行': 'A crossroads intersection - you\'re GOING somewhere, choosing which path to take at the crossroads!',
  '来': 'A person arriving at a rice field - COME here to help with the harvest! Beckoning someone to approach.',
  '見': 'An eye (目) on legs - your eyes walk around to SEE everything! They\'re always looking and observing.',
  '聞': 'An ear (耳) at the gate - you put your ear to the door to HEAR what\'s happening inside! Also means ask.',
  '食': 'A person (人) with a good (良) roof over their head - that\'s the top part. Below is a spoon bringing food to their mouth. Eating requires shelter and utensils!',
  '読': 'Words (言) selling at market - you READ the price tags and signs when shopping! Reading is everywhere.',
  '書': 'A brush in hand making marks - you WRITE with a brush or pen, creating characters on paper! Also means book.',
  '話': 'Words (言) spoken by the tongue - telling a TALE or story with your mouth! Also means talk/speak.',
  '語': 'Words (言) that I speak - my WORDS come from my mouth! Also means language/tell.',
  '学': 'A child (子) under a roof learning - STUDY happens when children are sheltered and taught knowledge!',
  '校': 'Tree (木) with crossed marks - teachers mark EXAM papers under a tree, crossing out wrong answers! Also means school.',
  '車': 'A bird\'s eye view of a CAR - you can see the axle, wheels, and chassis from above! Also means vehicle/wheel.',
  '高': 'A TALL tower with a roof on top - the building reaches high into the sky! Also means expensive/high.',
  '長': 'An old person with LONG flowing hair - elders have lived a LONG time and their hair grows long!',
  '国': 'A jewel (玉) enclosed by borders - a COUNTRY protects its treasures within its boundaries!',
  '休': 'A person (人) leaning against a tree (木) - taking a REST in the shade after working hard!',
  '気': 'Steam rising from rice - the SPIRIT and energy of life rising up like vapor! Also means air/atmosphere.'
};

// Read the kanji data
const kanjiDataPath = path.join(__dirname, '../public/data/kanji.json');
const kanjiData = JSON.parse(fs.readFileSync(kanjiDataPath, 'utf8'));

// Filter N5 kanji and add mnemonics
const n5Kanji = kanjiData
  .filter(k => k.jlpt_level === 'N5')
  .map(k => ({
    character: k.character,
    meaning: k.meaning,
    stroke_count: k.stroke_count,
    jlpt_level: k.jlpt_level,
    mnemonic: completeMnemonics[k.character] || `Mnemonic for ${k.character} (${k.meaning}) - needs creation`
  }));

// Save to JSON file
const outputPath = path.join(__dirname, '../public/data/n5-kanji-mnemonics.json');
fs.writeFileSync(outputPath, JSON.stringify(n5Kanji, null, 2), 'utf8');

console.log(`✅ Created complete mnemonics file with ${n5Kanji.length} N5 kanji`);
console.log(`📁 Saved to: ${outputPath}`);

// Check coverage
const withMnemonics = n5Kanji.filter(k => !k.mnemonic.includes('needs creation')).length;
const missing = n5Kanji.length - withMnemonics;

console.log(`\n📊 Coverage:`);
console.log(`   ✓ Complete: ${withMnemonics}/${n5Kanji.length}`);
if (missing > 0) {
  console.log(`   ⚠️  Missing: ${missing}`);
  console.log(`\nMissing kanji:`);
  n5Kanji.filter(k => k.mnemonic.includes('needs creation')).forEach(k => {
    console.log(`   - ${k.character} (${k.meaning})`);
  });
}
