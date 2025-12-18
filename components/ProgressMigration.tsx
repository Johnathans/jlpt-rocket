'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';

/**
 * Component that automatically syncs localStorage progress to Supabase
 * when a user logs in. Merges local data with server data (server is source of truth).
 * Should be included in the main layout.
 */
export function ProgressMigration() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete' | 'error'>('idle');

  useEffect(() => {
    const handleAuthChange = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && syncStatus === 'idle') {
        setSyncStatus('syncing');
        console.log('[ProgressSync] User logged in, syncing local data to Supabase...');
        
        try {
          // Sync any local data to Supabase (one-time merge)
          await ReviewSystemSupabase.syncLocalDataToSupabase();
          setSyncStatus('complete');
          console.log('[ProgressSync] Sync complete - server is now source of truth');
        } catch (error) {
          console.error('[ProgressSync] Sync failed:', error);
          setSyncStatus('error');
        }
      }
    };

    // Check on mount
    handleAuthChange();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        handleAuthChange();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncStatus]);

  // This component doesn't render anything visible
  return null;
}
