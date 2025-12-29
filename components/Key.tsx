import React from 'react';
import { NoteDefinition } from '../types';

interface KeyProps {
  note: NoteDefinition;
  isPlaying: boolean;
  onPlay: (note: NoteDefinition) => void;
  isBlack: boolean;
  offsetIndex?: number; // Used for black key positioning
}

const Key: React.FC<KeyProps> = ({ note, isPlaying, onPlay, isBlack, offsetIndex = 0 }) => {
  const handleInteract = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent ghost clicks
    onPlay(note);
  };

  if (isBlack) {
    // Calculate position for black keys.
    // In an octave, black keys are at specific intervals relative to white keys.
    // 0: C#, 1: D#, 2: F#, 3: G#, 4: A#
    // We position them absolutely.
    // This mapping ensures they sit between the correct white keys.
    const positionMap = [10, 24, 53, 67, 81]; // Percentages from left
    const leftPos = positionMap[offsetIndex] || 0;

    return (
      <button
        onMouseDown={handleInteract}
        onTouchStart={handleInteract}
        className={`
          absolute top-0 z-20
          w-[10%] h-[60%]
          rounded-b-lg border-x border-b border-black
          transition-all duration-75 ease-out
          shadow-lg
          ${isPlaying 
            ? 'bg-gray-800 -mt-1 h-[59%] shadow-inner' 
            : 'bg-black hover:bg-gray-900'
          }
        `}
        style={{ left: `${leftPos}%` }}
        aria-label={`Play ${note.name}`}
      >
        <span className="absolute bottom-2 left-0 right-0 text-[10px] text-gray-500 text-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          {note.name}
        </span>
      </button>
    );
  }

  // White Key
  return (
    <button
      onMouseDown={handleInteract}
      onTouchStart={handleInteract}
      className={`
        relative
        flex-1 h-full
        rounded-b-lg border border-gray-300
        transition-all duration-100 ease-out
        active:bg-gray-100
        first:rounded-bl-xl last:rounded-br-xl
        flex items-end justify-center pb-4
        z-10
        ${isPlaying 
          ? 'bg-indigo-100 shadow-inner translate-y-0.5' 
          : 'bg-white shadow-[0_4px_0_#cbd5e1] hover:bg-gray-50'
        }
      `}
      aria-label={`Play ${note.name}`}
    >
      <div className="flex flex-col items-center pointer-events-none select-none">
        <span className={`text-xl font-bold ${isPlaying ? 'text-indigo-600' : 'text-gray-400'}`}>
          {note.label}
        </span>
        {isPlaying && (
          <div className="absolute bottom-12 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        )}
      </div>
    </button>
  );
};

export default Key;
