import { ColorUtils } from "../lib/utils";
import { usePomodoroStore } from "../store";
import useLocalStorage from "./useLocalStorage";

export const DEFAULT_WORK = "#ee000e";
export const DEFAULT_BREAK = "#00e030";

export function useUI() {
  const { isBreak } = usePomodoroStore();
  const [workColor, setWorkColor] = useLocalStorage("work-color", DEFAULT_WORK);
  const [breakColor, setBreakColor] = useLocalStorage(
    "break-color",
    DEFAULT_BREAK,
  );

  const updateColor = (setter: typeof setWorkColor) => (color: string) => {
    if (!ColorUtils.isHexColor(color)) {
      throw new Error("A color must be a valid Hex Color");
    }
    setter(color);
  };

  const workPallet = ColorUtils.generateColorPalette(workColor);
  const breakPallet = ColorUtils.generateColorPalette(breakColor);

  return {
    workColor,
    breakColor,
    updateWorkColor: updateColor(setWorkColor),
    updateBreakColor: updateColor(setBreakColor),
    workPallet,
    breakPallet,
    currentPallet: isBreak ? breakPallet : workPallet,
  };
}
