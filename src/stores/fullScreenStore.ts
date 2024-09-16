import { create } from "zustand";

export interface FullscreenState {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

export const useFullscreenStore = create<FullscreenState>((set) => ({
  isFullscreen: false,
  setIsFullscreen: (value) => set({ isFullscreen: value }),
}));
