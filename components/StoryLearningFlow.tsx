'use client';

import { useState } from 'react';
import StoryLearningModal from './StoryLearningModal';
import StoryReading from './StoryReading';
import StoryRecallExercise from './StoryRecallExercise';

interface StoryItem {
  id: string;
  japanese: string;
  reading?: string;
  english: string;
  type: 'kanji' | 'vocabulary';
  known: boolean;
}

interface RecallItem {
  id: string;
  japanese: string;
  reading?: string;
  english: string;
  audio?: string;
  type: 'match' | 'listen';
}

interface StoryData {
  id: string;
  title: string;
  image: string;
  text: string;
  textWithFurigana: string;
  items: StoryItem[];
  recallExercises: RecallItem[];
}

interface StoryLearningFlowProps {
  story: StoryData;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type LearningPhase = 'modal' | 'reading' | 'recall' | 'complete';

export default function StoryLearningFlow({
  story,
  isOpen,
  onClose,
  onComplete
}: StoryLearningFlowProps) {
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('modal');
  const [knownItems, setKnownItems] = useState<string[]>([]);

  const handleStartLearning = (knownItemIds: string[]) => {
    console.log('StoryLearningFlow: handleStartLearning called with:', knownItemIds);
    setKnownItems(knownItemIds);
    console.log('StoryLearningFlow: Setting phase to reading');
    setCurrentPhase('reading');
  };

  const handleContinueToRecall = () => {
    setCurrentPhase('recall');
  };

  const handleRecallComplete = () => {
    setCurrentPhase('complete');
    onComplete();
  };

  const handleClose = () => {
    setCurrentPhase('modal');
    onClose();
  };

  if (!isOpen) return null;

  console.log('StoryLearningFlow: Current phase is', currentPhase);

  switch (currentPhase) {
    case 'modal':
      // Skip modal and go directly to reading
      handleStartLearning([]);
      return null;

    case 'reading':
      return (
        <StoryReading
          storyTitle={story.title}
          storyImage={story.image}
          storyText={story.text}
          storyTextWithFurigana={story.textWithFurigana}
          onClose={handleClose}
          onContinue={handleContinueToRecall}
        />
      );

    case 'recall':
      return (
        <StoryRecallExercise
          items={story.recallExercises.filter(item => !knownItems.includes(item.id))}
          onClose={handleClose}
          onComplete={handleRecallComplete}
        />
      );

    default:
      return null;
  }
}
