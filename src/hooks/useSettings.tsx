import { useCallback, useEffect } from "react";
import { useSettingsStore } from "../store";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_WORK_HUE = 99;
const DEFAULT_BREAK_HUE = 37;
export const DEFAULT_SETTINGS = {
  workHue: DEFAULT_WORK_HUE,
  breakHue: DEFAULT_BREAK_HUE,
};

export function useSettings() {
  const { workHue, breakHue, setWorkHue, setBreakHue } = useSettingsStore();
  const [localSettings, setLocalSettings] = useLocalStorage(
    "settings",
    DEFAULT_SETTINGS,
  );

  useEffect(() => {
    if (workHue === undefined || breakHue === undefined) {
      setWorkHue(localSettings.workHue);
      setBreakHue(localSettings.breakHue);
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
    },

    [localSettings, setLocalSettings],
  );
  return {
    workHue: workHue ?? DEFAULT_WORK_HUE,
    breakHue: breakHue ?? DEFAULT_BREAK_HUE,
    localSettings,
    updateSettings,
  };
}
