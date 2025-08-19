'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

interface JLPTLevelContextType {
  currentLevel: JLPTLevel;
  setCurrentLevel: (level: JLPTLevel) => void;
  isLoading: boolean;
}

const JLPTLevelContext = createContext<JLPTLevelContextType | undefined>(undefined);

interface JLPTLevelProviderProps {
  children: ReactNode;
}

export function JLPTLevelProvider({ children }: JLPTLevelProviderProps) {
  const [currentLevel, setCurrentLevelState] = useState<JLPTLevel>('N5');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved level from localStorage on mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('jlpt-current-level');
    if (savedLevel && ['N5', 'N4', 'N3', 'N2', 'N1'].includes(savedLevel)) {
      setCurrentLevelState(savedLevel as JLPTLevel);
    }
    setIsLoading(false);
  }, []);

  // Save level to localStorage when it changes
  const setCurrentLevel = (level: JLPTLevel) => {
    setCurrentLevelState(level);
    localStorage.setItem('jlpt-current-level', level);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('jlpt-level-changed', { 
      detail: { level } 
    }));
  };

  return (
    <JLPTLevelContext.Provider value={{
      currentLevel,
      setCurrentLevel,
      isLoading
    }}>
      {children}
    </JLPTLevelContext.Provider>
  );
}

export function useJLPTLevel() {
  const context = useContext(JLPTLevelContext);
  if (context === undefined) {
    throw new Error('useJLPTLevel must be used within a JLPTLevelProvider');
  }
  return context;
}
