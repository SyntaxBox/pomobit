import { ColorUtils } from "../lib/utils";
import { usePomodoroStore } from "../store";
import { UseSettings } from "./useSettings";

export function useUI() {
  const { isBreak } = usePomodoroStore();
  const { workColor, breakColor } = UseSettings();
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
