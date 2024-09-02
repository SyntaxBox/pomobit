import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_WORK = "#ee000e";
const DEFAULT_BREAK = "#00e030";
export const DEFAULT_SETTINGS = {
  workColor: DEFAULT_WORK,
  breakColor: DEFAULT_BREAK,
};

export function UseSettings() {
  const [settings, setSettings] = useLocalStorage("settings", DEFAULT_SETTINGS);
  const updateSettings = (updates: Partial<typeof settings>) => {
    setSettings({ ...settings, ...updates });
  };
  return { ...settings, settings, updateSettings };
}
