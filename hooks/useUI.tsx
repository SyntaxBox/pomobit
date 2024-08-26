import { ColorUtils } from "../lib/utils";
import useLocalStorage from "./useLocalStorage";

export const DEFAULT_WORK_ = "#00e030";
export const DEFAULT_BREAK_ = "#ee000e";

export function useUI() {
  const [workColor, setWorkColor] = useLocalStorage(
    "work-color",
    DEFAULT_WORK_,
  );
  const [breakColor, setBreakColor] = useLocalStorage(
    "break--color",
    DEFAULT_BREAK_,
  );

  const updateColor = (setter: typeof setWorkColor) => (color: string) => {
    if (!ColorUtils.isHexColor(color)) {
      throw new Error("A color must be a valid Hex Color");
    }
    setter(color);
  };

  return {
    workColor,
    breakColor,
    updateWorkColor: updateColor(setWorkColor),
    updateBreakColor: updateColor(setBreakColor),
  };
}
