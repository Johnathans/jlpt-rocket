# Streak Sync Debug Steps

## On the device showing streak=6 (incorrect):

1. Open browser console (F12 or Cmd+Option+I)

2. Check what's in localStorage:
```javascript
JSON.parse(localStorage.getItem('userStreak'))
```

3. Force clear and resync:
```javascript
localStorage.removeItem('userStreak')
location.reload()
```

4. If that doesn't work, check Supabase data:
```javascript
// Import the streak system
const { StreakSystemSupabase } = await import('./lib/streakSystemSupabase')

// Force sync from server
await StreakSystemSupabase.forceSyncFromSupabase()
```

## What to look for in console:

The sync should show:
```
[StreakSystem] Local has more sessions (X vs Y)
OR
[StreakSystem] Supabase has more/equal sessions (Y vs X)
```

If local shows MORE sessions than Supabase, that's the problem.
The device with stale data shouldn't have more sessions than the server.
