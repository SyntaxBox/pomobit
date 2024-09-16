import { Maximize, Minimize } from "lucide-react";
import { useFullscreen, useUI } from "../hooks";
import { Button } from "../ui";

export function ToggleFullscreen() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { currentPallet } = useUI();
  return (
    <Button
      title="Toggle Fullscreen"
      className="cursor-pointer p-2"
      pallet={currentPallet}
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </Button>
  );
}
