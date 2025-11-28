'use client';

import { useState } from 'react';
import { Settings, Volume2, Bell, Moon, Globe, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Settings Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Customize your learning experience</p>
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Preferences</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Sound Effects</p>
                  <p className="text-sm text-gray-600">Play sounds during lessons</p>
                </div>
              </div>
              <button
                onClick={() => setSoundEffects(!soundEffects)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  soundEffects ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Remind me to study</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Use dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
          
          <div className="space-y-4">
            <button className="w-full px-6 py-3 bg-pink-500 text-white hover:bg-pink-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-pink-600 hover:border-b-pink-700 text-sm text-left flex items-center gap-3">
              <Globe className="h-4 w-4" />
              Language & Region
            </button>
            
            <button className="w-full px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-lg shadow-sm border-b-4 border-b-green-600 hover:border-b-green-700 text-sm text-left flex items-center gap-3">
              <Shield className="h-4 w-4" />
              Privacy & Security
            </button>
          </div>
        </div>

        {/* Save Settings */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <button className="w-full px-6 py-4 bg-green-500 text-white hover:bg-green-600 font-bold transition-colors rounded-lg shadow-sm border-b-4 border-b-green-600 hover:border-b-green-700 text-base">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}
