# Database Migration Instructions

## Critical Fix: item_id Type Mismatch

### Problem
The `user_progress` table was created with `item_id INTEGER`, but the content tables (kanji, vocabulary, sentences) use UUID primary keys. This caused all progress saves to fail silently.

### Solution
Run the migration script to change `item_id` from INTEGER to TEXT.

### Steps to Apply Migration

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor

2. **Run the Migration Script**
   ```sql
   -- Change item_id column type from INTEGER to TEXT
   ALTER TABLE user_progress ALTER COLUMN item_id TYPE TEXT;
   ```

3. **Verify the Change**
   ```sql
   -- Check that item_id is now TEXT
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'user_progress' AND column_name = 'item_id';
   ```
   
   Expected result: `data_type` should show `text`

### What This Fixes

✅ **Before Migration:**
- `parseInt(uuid)` returned `NaN`
- Database inserts failed
- Progress only saved to localStorage
- No cross-device sync

✅ **After Migration:**
- UUIDs stored correctly as TEXT
- Database inserts succeed
- Progress syncs to Supabase
- Cross-device sync works

### Safe to Run

- ✅ Non-destructive change
- ✅ Existing data automatically converted
- ✅ UNIQUE constraint still works
- ✅ No downtime required

### If You Already Have Data

If you created the `user_progress` table with INTEGER type and have existing data:
1. The migration will automatically cast existing values to TEXT
2. If you have no data yet, the migration is even simpler
3. No data loss will occur

### Testing After Migration

1. Log in to the app
2. Complete a training session (match, flashcard, or cloze)
3. Check Supabase dashboard → Table Editor → user_progress
4. You should see new rows with your progress data
5. Log out and log in on another device - progress should sync

### Rollback (if needed)

If you need to rollback (not recommended):
```sql
ALTER TABLE user_progress ALTER COLUMN item_id TYPE INTEGER USING item_id::INTEGER;
```

Note: This will only work if all item_id values are numeric strings. UUIDs cannot be converted to INTEGER.
