import { create } from "zustand";

interface PomodoroState {
  workShift?: number; // Shift in seconds
  autoStart?: boolean;
  breakShift?: number; // Shift in seconds
  isRunning: boolean;
  timeLeft: number;
  isBreak: boolean;
  setWorkShift: (duration: number) => void;
  setBreakShift: (duration: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  switchMode: () => void;
  setAutoStart: (value: boolean) => void;
  tick: () => void;
  updateTimeLeft: (newTime: number) => void;
}

export const usePomodoroStore = create<PomodoroState>((set) => ({
  isRunning: false,
  timeLeft: 25 * 60,
  isBreak: false,
  setWorkShift: (duration: number) =>
    set((state) => ({
      workShift: duration,
      timeLeft: !state.isBreak ? duration : state.timeLeft,
    })),
  setBreakShift: (duration: number) =>
    set((state) => ({
      breakShift: duration,
      timeLeft: state.isBreak ? duration : state.timeLeft,
    })),

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () =>
    set((state) => ({
      timeLeft: state.workShift,
      isRunning: false,
      isBreak: false,
    })),
  setAutoStart: (value: boolean) => set({ autoStart: value }),
  switchMode: () =>
    set((state) => ({
      isBreak: !state.isBreak,
      timeLeft: !state.isBreak ? state.breakShift : state.workShift,
    })),
  tick: () =>
    set((state) => ({
      timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      isRunning: state.timeLeft === 0 ? false : state.isRunning,
    })),
  updateTimeLeft: (newTime) =>
    set(() => ({
      timeLeft: newTime,
    })),
}));
