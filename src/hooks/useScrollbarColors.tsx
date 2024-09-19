import { useEffect } from "react";
import { useUI } from "./useUI";
import { ColorUtils } from "../lib/utils";

export function useScrollbarColors() {
  const { currentPallet } = useUI();
  const [, , , bg1, bg2] = ColorUtils.generateShades(currentPallet.original, 8);
  useEffect(() => {
    const style = `
            ::-webkit-scrollbar {
                width: 6px;
            }
            ::-webkit-scrollbar-track {
                background: ${currentPallet.background + "b2"};
            }
            ::-webkit-scrollbar-thumb {
                background: ${bg1};
                border-radius: 3px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${bg2};
            }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);

    return () => {
      // Clean up the style when the component unmounts
      document.head.removeChild(styleSheet);
    };
  }, [currentPallet]); // Re-run effect if colors change
}

export default useScrollbarColors;
