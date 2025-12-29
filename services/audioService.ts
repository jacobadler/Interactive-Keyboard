class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.5; // Master volume
      this.masterGain.connect(this.audioContext.destination);
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public playTone(frequency: number, duration: number = 1.5) {
    this.init();
    if (!this.audioContext || !this.masterGain) return;

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Use a combination of waves for a richer sound (closer to piano/organ)
    osc.type = 'triangle'; 
    
    osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // ADSR Envelope
    const now = this.audioContext.currentTime;
    const attack = 0.01;
    const decay = 0.1;
    const sustain = 0.6;
    const release = 1.0;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attack); // Attack
    gainNode.gain.exponentialRampToValueAtTime(sustain, now + attack + decay); // Decay to sustain level
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // Release

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + release);
    
    // Cleanup helps performance
    setTimeout(() => {
      osc.disconnect();
      gainNode.disconnect();
    }, (duration + release) * 1000);
  }
}

export const audioService = new AudioService();
