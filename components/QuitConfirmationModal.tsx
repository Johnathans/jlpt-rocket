'use client';

interface QuitConfirmationModalProps {
  isOpen: boolean;
  onKeepLearning: () => void;
  onQuit: () => void;
}

export default function QuitConfirmationModal({ 
  isOpen, 
  onKeepLearning, 
  onQuit 
}: QuitConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Are you sure?
        </h2>
        
        {/* Description */}
        <p className="text-center text-gray-600 text-lg mb-8">
          If you quit, you will lose your progress.
        </p>
        
        {/* Keep Learning Button */}
        <button
          onClick={onKeepLearning}
          className="w-full py-4 px-6 text-white font-semibold rounded-full transition-all duration-200 mb-4 border-b-4 border-gray-600"
          style={{ backgroundColor: '#333333' }}
        >
          Keep learning
        </button>
        
        {/* Quit Button */}
        <button
          onClick={onQuit}
          className="w-full py-2 px-6 text-red-500 font-semibold bg-transparent hover:bg-red-50 rounded-full transition-all duration-200"
        >
          Quit
        </button>
      </div>
    </div>
  );
}
