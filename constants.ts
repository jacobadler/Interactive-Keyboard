import { NoteDefinition } from './types';

// Frequencies for the 4th octave (A4 = 440Hz)
export const OCTAVE_DATA: NoteDefinition[] = [
  { name: 'C', frequency: 261.63, type: 'white', label: 'C' },
  { name: 'C#', frequency: 277.18, type: 'black' },
  { name: 'D', frequency: 293.66, type: 'white', label: 'D' },
  { name: 'D#', frequency: 311.13, type: 'black' },
  { name: 'E', frequency: 329.63, type: 'white', label: 'E' },
  { name: 'F', frequency: 349.23, type: 'white', label: 'F' },
  { name: 'F#', frequency: 369.99, type: 'black' },
  { name: 'G', frequency: 392.00, type: 'white', label: 'G' },
  { name: 'G#', frequency: 415.30, type: 'black' },
  { name: 'A', frequency: 440.00, type: 'white', label: 'A' },
  { name: 'A#', frequency: 466.16, type: 'black' },
  { name: 'B', frequency: 493.88, type: 'white', label: 'B' },
  { name: 'C5', frequency: 523.25, type: 'white', label: 'C' }, // High C
];

export const MOOD_OPTIONS = [
  "Happy & Upbeat",
  "Melancholy & Slow",
  "Spooky & Mysterious",
  "Energetic & Fast",
  "Calm & Lullaby"
];
