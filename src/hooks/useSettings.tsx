import { useCallback, useEffect } from "react";
import { usePomodoroStore, useUIStore } from "../store";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_WORK_HUE = 99;
const DEFAULT_BREAK_HUE = 37;
const DEFAULT_WORK_SHIFT = 25 * 60; // 25 minutes;
const DEFAULT_BREAK_SHIFT = 5 * 60; // 5 minutes;
const DEFAULT_AUTO_START = true;
export const DEFAULT_SETTINGS = {
  workHue: DEFAULT_WORK_HUE,
  workShift: DEFAULT_WORK_SHIFT,
  breakShift: DEFAULT_BREAK_SHIFT,
  breakHue: DEFAULT_BREAK_HUE,
  autoStart: DEFAULT_AUTO_START,
};

export function useSettings() {
  const { workHue, breakHue, setWorkHue, setBreakHue } = useUIStore();
  const {
    workShift,
    breakShift,
    setWorkShift,
    setBreakShift,
    autoStart,
    setAutoStart,
  } = usePomodoroStore();
  const [localSettings, setLocalSettings] = useLocalStorage(
    "settings",
    DEFAULT_SETTINGS,
  );

  useEffect(() => {
    if (workHue === undefined || breakHue === undefined) {
      setWorkHue(localSettings.workHue);
      setBreakHue(localSettings.breakHue);
    }
    if (workShift === undefined || breakShift === undefined) {
      setWorkShift(localSettings.workShift);
      setBreakShift(localSettings.breakShift);
    }
    if (autoStart === undefined) {
      setAutoStart(localSettings.autoStart);
    }
  }, []);

  const updateSettings = useCallback(
    (updates: Partial<typeof localSettings>) => {
      setLocalSettings({ ...localSettings, ...updates });
      if (updates.workHue !== undefined) {
        setWorkHue(updates.workHue);
      }
      if (updates.breakHue !== undefined) {
        setBreakHue(updates.breakHue);
      }
      if (updates.workShift !== undefined) {
        setWorkShift(updates.workShift);
      }
      if (updates.breakShift !== undefined) {
        setBreakShift(updates.breakShift);
      }
      if (updates.autoStart !== undefined) {
        setAutoStart(updates.autoStart);
      }
    },

    [setLocalSettings],
  );
  return {
    workHue: workHue ?? DEFAULT_WORK_HUE,
    breakHue: breakHue ?? DEFAULT_BREAK_HUE,
    workShift: workShift ?? DEFAULT_WORK_SHIFT,
    breakShift: breakShift ?? DEFAULT_BREAK_SHIFT,
    autoStart: autoStart ?? DEFAULT_AUTO_START,
    localSettings,
    updateSettings,
  };
}
