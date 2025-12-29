import React, { useState, useCallback, useRef } from 'react';
import { OCTAVE_DATA } from '../constants';
import { audioService } from '../services/audioService';
import { NoteDefinition, NoteName } from '../types';
import Key from './Key';

interface PianoProps {
  onNotePlayed?: (note: NoteName) => void;
}

const Piano: React.FC<PianoProps> = ({ onNotePlayed }) => {
  const [activeNotes, setActiveNotes] = useState<Set<NoteName>>(new Set());
  const timeoutRefs = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});

  const playNote = useCallback((note: NoteDefinition) => {
    // Audio
    audioService.playTone(note.frequency);
    
    // Visual State
    setActiveNotes(prev => {
      const newSet = new Set(prev);
      newSet.add(note.name);
      return newSet;
    });

    // Callback for parent
    if (onNotePlayed) {
      onNotePlayed(note.name);
    }

    // Clear existing timeout for this note if rapidly clicked
    if (timeoutRefs.current[note.name]) {
      clearTimeout(timeoutRefs.current[note.name]);
    }

    // Remove active state after a short duration
    timeoutRefs.current[note.name] = setTimeout(() => {
      setActiveNotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(note.name);
        return newSet;
      });
    }, 300);
  }, [onNotePlayed]);

  const whiteKeys = OCTAVE_DATA.filter(n => n.type === 'white');
  const blackKeys = OCTAVE_DATA.filter(n => n.type === 'black');

  return (
    <div className="relative w-full max-w-4xl h-64 md:h-80 select-none">
      {/* Piano Chassis/Frame Background */}
      <div className="absolute -inset-4 bg-gray-900 rounded-xl shadow-2xl translate-y-2"></div>
      
      {/* Top Red Felt Strip (Classic Piano Detail) */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-red-900 z-0 rounded-t-lg opacity-80"></div>

      {/* Keys Container */}
      <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-inner ring-4 ring-gray-900 flex">
        
        {/* Render White Keys (Flex) */}
        {whiteKeys.map((note) => (
          <Key
            key={note.name}
            note={note}
            isBlack={false}
            isPlaying={activeNotes.has(note.name)}
            onPlay={playNote}
          />
        ))}

        {/* Render Black Keys (Absolute) */}
        {blackKeys.map((note, index) => (
          <Key
            key={note.name}
            note={note}
            isBlack={true}
            offsetIndex={index}
            isPlaying={activeNotes.has(note.name)}
            onPlay={playNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;