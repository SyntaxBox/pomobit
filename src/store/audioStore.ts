import { create } from "zustand";

export interface AudioState {
  isAudioCuesAllowed?: boolean;
  isPlaying: boolean;
  breakCue?: string;
  workCue?: string;
  setIsPlaying: (state: boolean) => void;
  setIsAudioCuesAllowed: (cues: boolean) => void;
  setWorkCue: (cue: string) => void;
  setBreakCue: (cue: string) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  setIsPlaying: (state) => set({ isPlaying: state }),
  setIsAudioCuesAllowed: (cues) => set({ isAudioCuesAllowed: cues }),
  setWorkCue: (cue) => set({ workCue: cue }),
  setBreakCue: (cue) => set({ breakCue: cue }),
}));
