'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';

/**
 * Component that automatically migrates localStorage progress to Supabase
 * when a user logs in. Should be included in the main layout.
 */
export function ProgressMigration() {
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'migrating' | 'complete' | 'error'>('idle');

  useEffect(() => {
    const handleAuthChange = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && migrationStatus === 'idle') {
        setMigrationStatus('migrating');
        console.log('[ProgressMigration] User logged in, checking for migration...');
        
        try {
          await ReviewSystemSupabase.migrateLocalStorageToSupabase();
          setMigrationStatus('complete');
          console.log('[ProgressMigration] Migration check complete');
        } catch (error) {
          console.error('[ProgressMigration] Migration failed:', error);
          setMigrationStatus('error');
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
  }, [migrationStatus]);

  // This component doesn't render anything visible
  return null;
}
