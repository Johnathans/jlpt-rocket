const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkVocabularyDuplicates() {
  try {
    console.log('🔍 Checking for vocabulary duplicates...\n');
    
    // Check for duplicate word+reading combinations
    const { data: duplicates, error: duplicateError } = await supabase
      .rpc('find_vocabulary_duplicates');
    
    if (duplicateError) {
      // If RPC doesn't exist, use manual query
      console.log('Using manual duplicate detection...');
      
      const { data: allVocab, error: fetchError } = await supabase
        .from('vocabulary')
        .select('id, word, reading, jlpt_level, meaning');
      
      if (fetchError) {
        console.error('Error fetching vocabulary:', fetchError);
        return;
      }
      
      // Group by word+reading combination
      const groups = {};
      allVocab.forEach(item => {
        const key = `${item.word}|${item.reading}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
      });
      
      // Find duplicates
      const duplicateGroups = Object.entries(groups).filter(([key, items]) => items.length > 1);
      
      console.log(`📊 Found ${duplicateGroups.length} duplicate word+reading combinations`);
      
      if (duplicateGroups.length > 0) {
        console.log('\n🔍 Sample duplicates:');
        duplicateGroups.slice(0, 10).forEach(([key, items]) => {
          const [word, reading] = key.split('|');
          console.log(`\n"${word}" (${reading}) - ${items.length} entries:`);
          items.forEach(item => {
            console.log(`  - ${item.jlpt_level}: ${item.meaning} (ID: ${item.id})`);
          });
        });
        
        // Count total duplicate entries
        const totalDuplicates = duplicateGroups.reduce((sum, [key, items]) => sum + items.length - 1, 0);
        console.log(`\n📊 Total duplicate entries to remove: ${totalDuplicates}`);
        
        return duplicateGroups;
      } else {
        console.log('✅ No duplicates found!');
        return [];
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking duplicates:', error);
  }
}

async function removeDuplicates() {
  try {
    console.log('🧹 Removing vocabulary duplicates...\n');
    
    const duplicateGroups = await checkVocabularyDuplicates();
    
    if (!duplicateGroups || duplicateGroups.length === 0) {
      console.log('✅ No duplicates to remove');
      return;
    }
    
    let removedCount = 0;
    
    for (const [key, items] of duplicateGroups) {
      // Keep the first entry, remove the rest
      const toKeep = items[0];
      const toRemove = items.slice(1);
      
      console.log(`Keeping: ${toKeep.word} (${toKeep.reading}) - ${toKeep.jlpt_level}`);
      console.log(`Removing ${toRemove.length} duplicates...`);
      
      for (const item of toRemove) {
        const { error } = await supabase
          .from('vocabulary')
          .delete()
          .eq('id', item.id);
        
        if (error) {
          console.error(`Error removing duplicate ${item.id}:`, error);
        } else {
          removedCount++;
        }
      }
    }
    
    console.log(`\n✅ Removed ${removedCount} duplicate entries`);
    
    // Verify final count
    const { count, error } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });
    
    if (!error) {
      console.log(`📊 Final vocabulary count: ${count} entries`);
    }
    
  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
  }
}

// Check if we should remove duplicates
const shouldRemove = process.argv.includes('--remove');

if (shouldRemove) {
  removeDuplicates();
} else {
  checkVocabularyDuplicates();
}
