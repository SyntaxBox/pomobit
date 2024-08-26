import { create } from "zustand";

export const DEFAULT_WORK_BG = "#00e030";
export const DEFAULT_BREAK_BG = "#ee000e";

interface UIState {
  workBg: string;
  breakBg: string;
  setWorkBg: (bg: string) => void;
  setBreakBg: (bg: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  workBg: DEFAULT_WORK_BG,
  breakBg: DEFAULT_BREAK_BG,
  setWorkBg: (bg) => {
    set((state) => ({
      ...state,
      workBg: bg,
    }));
  },
  setBreakBg: (bg) => {
    set((state) => ({
      ...state,
      breakBg: bg,
    }));
  },
}));
