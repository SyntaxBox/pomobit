import { StringUtils } from "../lib/utils";
import useLocalStorage from "./useLocalStorage";

export const DEFAULT_WORK_BG = "#00e030";
export const DEFAULT_BREAK_BG = "#ee000e";

export function useUI() {
  const [workBgColor, setWorkBgColor] = useLocalStorage(
    "work-bg-color",
    DEFAULT_WORK_BG,
  );
  const [breakBgColor, setBreakBgColor] = useLocalStorage(
    "break-bg-color",
    DEFAULT_BREAK_BG,
  );

  const updateBgColor = (setter: typeof setWorkBgColor) => (color: string) => {
    if (!StringUtils.isHexColor(color)) {
      throw new Error("A color must be a valid Hex Color");
    }
    setter(color);
  };

  return {
    workBgColor,
    breakBgColor,
    updateWorkBgColor: updateBgColor(setWorkBgColor),
    updateBreakBgColor: updateBgColor(setBreakBgColor),
  };
}
