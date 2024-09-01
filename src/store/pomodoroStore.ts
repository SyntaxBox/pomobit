import { create } from "zustand";

interface PomodoroState {
  workDuration: number; // Duration in seconds
  breakDuration: number; // Duration in seconds
  isRunning: boolean;
  timeLeft: number;
  isBreak: boolean;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  switchMode: () => void;
  tick: () => void;
  updateTimeLeft: (newTime: number) => void;
}

export const usePomodoroStore = create<PomodoroState>((set) => ({
  workDuration: 25 * 60, // 25 minutes in seconds
  breakDuration: 5 * 60, // 5 minutes in seconds
  isRunning: false,
  timeLeft: 25 * 60,
  isBreak: false,

  setWorkDuration: (duration: number) =>
    set((state) => ({
      workDuration: duration,
      timeLeft: !state.isBreak ? duration : state.timeLeft,
    })),
  setBreakDuration: (duration: number) =>
    set((state) => ({
      breakDuration: duration,
      timeLeft: state.isBreak ? duration : state.timeLeft,
    })),

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () =>
    set((state) => ({
      timeLeft: state.workDuration,
      isRunning: false,
      isBreak: false,
    })),
  switchMode: () =>
    set((state) => ({
      isBreak: !state.isBreak,
      timeLeft: !state.isBreak ? state.breakDuration : state.workDuration,
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
