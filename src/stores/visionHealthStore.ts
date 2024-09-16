import { create } from "zustand";

export interface VisionHealthState {
  isVisionHealthEnabled?: boolean;
  setIsVisionHealthEnabled: (state: boolean) => void;
}

export const useVisionHealthStore = create<VisionHealthState>((set) => ({
  setIsVisionHealthEnabled: (state) => set({ isVisionHealthEnabled: state }),
}));
