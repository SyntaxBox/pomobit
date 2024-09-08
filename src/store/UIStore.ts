import { create } from "zustand";

export interface UIState {
  workHue?: number;
  breakHue?: number;
  setWorkHue: (hue: number) => void;
  setBreakHue: (hue: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  setWorkHue: (hue) => {
    set((state) => ({ ...state, workHue: hue }));
  },
  setBreakHue: (hue) => {
    set((state) => ({ ...state, breakHue: hue }));
  },
}));
