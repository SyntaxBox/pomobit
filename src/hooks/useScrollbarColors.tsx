import { useEffect } from "react";
import { useUI } from "./useUI";

export function useScrollbarColors() {
  const { currentPallet } = useUI();
  useEffect(() => {
    const style = `
            ::-webkit-scrollbar {
                width: 6px;
            }
            ::-webkit-scrollbar-track {
                background: ${currentPallet.background + "90"};
            }
            ::-webkit-scrollbar-thumb {
                background: ${currentPallet.primary1 + "70"};
                border-radius: 3px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${currentPallet.primary1};
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
