import { Maximize, Minimize } from "lucide-react";
import { useFullscreen, useUI } from "../hooks";
import { Button } from "../ui";
import { useLocation } from "react-router-dom";

export function ToggleFullscreen() {
  const location = useLocation();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { currentPallet } = useUI();

  const isHome = location.pathname === "/";
  if (!isHome) return;
  return (
    <Button
      title="Toggle Fullscreen"
      className="cursor-pointer w-fit"
      pallet={currentPallet}
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </Button>
  );
}
