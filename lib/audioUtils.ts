// Audio utility functions for UI sounds

const getAudioSettings = () => {
  if (typeof window === 'undefined') return { soundEffects: true, voicePronunciation: true };
  
  const savedSettings = localStorage.getItem('audioSettings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return { soundEffects: true, voicePronunciation: true };
};

export const playUISound = (soundFile: string, volume: number = 0.5) => {
  const settings = getAudioSettings();
  if (!settings.soundEffects) return;
  
  try {
    const audio = new Audio(`/sounds/${soundFile}`);
    audio.volume = volume;
    audio.play().catch(error => {
      console.warn('Could not play UI sound:', error);
    });
  } catch (error) {
    console.warn('Error creating audio:', error);
  }
};

// Specific sound functions
export const playIncorrectSound = () => {
  playUISound('notification-off-269282 (1).mp3', 0.3);
};

export const playCorrectSound = () => {
  playUISound('new-notification-07-210334.mp3', 0.3);
};

// Voice pronunciation check
export const shouldPlayVoice = () => {
  const settings = getAudioSettings();
  return settings.voicePronunciation;
};

export const playButtonClickSound = () => {
  // Click sounds play regardless of sound effects setting for better UX
  console.log('Attempting to play click sound...');
  try {
    const audio = new Audio('/sounds/mouse-click-2-89867.mp3');
    audio.volume = 0.5;
    audio.play().then(() => {
      console.log('Click sound played successfully');
    }).catch(error => {
      console.warn('Could not play click sound:', error);
    });
  } catch (error) {
    console.warn('Error creating click audio:', error);
  }
};
