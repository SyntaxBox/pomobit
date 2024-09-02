import { ColorUtils } from "../lib/utils";
import { usePomodoroStore } from "../store";
import { useSettings } from "./useSettings";

export function useUI() {
  const { isBreak } = usePomodoroStore();
  const { workHue, breakHue } = useSettings();

  const workColor = ColorUtils.hsvToHex(workHue, 100, 100);
  const breakColor = ColorUtils.hsvToHex(breakHue, 100, 100);

  const workPallet = ColorUtils.generateColorPalette(workColor);
  const breakPallet = ColorUtils.generateColorPalette(breakColor);

  return {
    workColor,
    breakColor,
    breakPallet,
    workPallet,
    currentPallet: isBreak ? breakPallet : workPallet,
  };
}
