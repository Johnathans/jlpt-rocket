'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AudioSettings {
  soundEffects: boolean;
  voicePronunciation: boolean;
}

export default function AudioSettingsModal({ isOpen, onClose }: AudioSettingsModalProps) {
  const [settings, setSettings] = useState<AudioSettings>({
    soundEffects: true,
    voicePronunciation: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('audioSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('audioSettings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (setting: keyof AudioSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 max-w-sm mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Audio Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-6">
          {/* Sound Effects Toggle */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-800">Sound Effects</h3>
              <p className="text-sm text-gray-600 mt-1">Play sounds for correct/incorrect answers</p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => handleToggle('soundEffects')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEffects ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Voice Pronunciation Toggle */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-800">Voice Pronunciation</h3>
              <p className="text-sm text-gray-600 mt-1">Play Japanese audio pronunciation</p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => handleToggle('voicePronunciation')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.voicePronunciation ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.voicePronunciation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors border-b-4 border-gray-300 hover:border-gray-400"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to get current audio settings
export function useAudioSettings(): AudioSettings {
  const [settings, setSettings] = useState<AudioSettings>({
    soundEffects: true,
    voicePronunciation: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('audioSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Listen for storage changes to sync across components
    const handleStorageChange = () => {
      const updatedSettings = localStorage.getItem('audioSettings');
      if (updatedSettings) {
        setSettings(JSON.parse(updatedSettings));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleSettingsChange = (event: CustomEvent) => {
      setSettings(event.detail);
    };

    window.addEventListener('audioSettingsChanged', handleSettingsChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('audioSettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  return settings;
}
