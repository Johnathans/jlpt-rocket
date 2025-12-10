'use client';

import { User, Mail, Calendar, Edit3, Settings, FileText } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    console.log('Auth loading:', loading);
    console.log('User exists:', !!user);
    
    if (user) {
      // Debug: Log user object to see available data
      console.log('User object:', user);
      console.log('User metadata:', user.user_metadata);
      console.log('App metadata:', user.app_metadata);
      
      // Get user metadata from Google OAuth
      const userMetadata = user.user_metadata || {};
      const appMetadata = user.app_metadata || {};
      
      const profileData = {
        name: userMetadata.full_name || userMetadata.name || user.email?.split('@')[0] || 'User',
        email: user.email,
        avatar_url: userMetadata.avatar_url || userMetadata.picture,
        created_at: user.created_at,
        provider: appMetadata.provider || 'email'
      };
      
      setProfile(profileData);
      setEditName(profileData.name);
    }
  }, [user, loading]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) return;
    
    setIsSaving(true);
    try {
      const { error } = await updateProfile({ full_name: editName.trim() });
      
      if (error) {
        alert('Failed to update profile. Please try again.');
      } else {
        // Update local profile state
        setProfile((prev: any) => ({ ...prev, name: editName.trim() }));
        setIsEditing(false);
        setShowSuccessToast(true);
        // Auto-hide toast after 3 seconds
        setTimeout(() => setShowSuccessToast(false), 3000);
      }
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(profile?.name || '');
    setIsEditing(false);
  };

  // Show loading state if auth is still loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" className="bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" className="bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Please sign in to view your profile</h2>
          <a href="/login" className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
            Sign In
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-8" className="bg-gray-50 dark:bg-gray-900">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-bold">Profile updated successfully!</span>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Profile
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-gray-600 dark:text-gray-300" />
              </div>
            )}
            <div className="text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-2xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving || !editName.trim()}
                      className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                      className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile?.name || 'Loading...'}</h2>
                  <p className="text-gray-600 text-lg">JLPT N5 Student</p>
                  <p className="text-gray-500 text-sm mt-1">{profile?.email || 'Loading...'}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Account Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="flex justify-center mb-3">
                    <Mail className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-sm text-gray-600 break-all">{profile?.email || 'Loading...'}</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="flex justify-center mb-3">
                    <Calendar className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Member Since</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {profile?.created_at 
                      ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short'
                        })
                      : 'Loading...'
                    }
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="flex justify-center mb-3">
                    <User className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Type</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Free Account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={handleEditProfile}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <Edit3 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium">Edit Profile</span>
                </button>
                
                <button 
                  onClick={() => alert('Account Settings functionality coming soon!')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium">Account Settings</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Danger Zone</h3>
              
              <button className="w-full px-8 py-4 bg-red-500 text-white font-bold text-lg rounded-xl hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}