export type NoteName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B' | 'C5';

export interface NoteDefinition {
  name: NoteName;
  frequency: number;
  type: 'white' | 'black';
  label?: string; // e.g., "Do", "Re" or just "C"
  keyTrigger?: string; // Keyboard shortcut
}

export interface PlayableNote extends NoteDefinition {
  isPlaying: boolean;
}
