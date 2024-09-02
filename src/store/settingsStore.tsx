import { create } from "zustand";

export interface SettingsState {
  workHue?: number;
  breakHue?: number;
  setWorkHue: (hue: number) => void;
  setBreakHue: (hue: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  setWorkHue: (hue) => {
    set((state) => ({ ...state, workHue: hue }));
  },
  setBreakHue: (hue) => {
    set((state) => ({ ...state, breakHue: hue }));
  },
}));
