import React, { useState, useCallback } from 'react';
import Piano from './components/Piano';
import { NoteName } from './types';
import { audioService } from './services/audioService';

function App() {
  const [lastPlayedNote, setLastPlayedNote] = useState<NoteName | null>(null);

  // Warm up the audio engine on any interaction with the app
  const handleUserInteraction = useCallback(() => {
    audioService.resume();
  }, []);

  return (
    <div 
      className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12"
      onMouseDown={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      onKeyDown={handleUserInteraction}
    >
      
      {/* Header */}
      <header className="mb-12 text-center space-y-4">
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Interactive keyboard
        </p>
      </header>

      {/* Main Stage */}
      <main className="w-full max-w-5xl flex flex-col items-center gap-12">
        
        {/* Piano Component */}
        <div className="w-full flex justify-center perspective-[1000px]">
          <Piano 
            onNotePlayed={(n) => setLastPlayedNote(n)}
          />
        </div>

        {/* Note Display */}
        <div className="h-16 flex items-center justify-center">
             {lastPlayedNote && (
               <div className="text-6xl font-black text-slate-800 opacity-50 transition-all duration-300 transform scale-100 animate-pulse">
                 {lastPlayedNote.replace('5', '')}
               </div>
             )}
        </div>

      </main>
    </div>
  );
}

export default App;