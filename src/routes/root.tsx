import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useScrollbarColors, useUI, useVisionHealth } from "../hooks";

export default function Root() {
  const { currentPallet } = useUI();
  useVisionHealth();
  useScrollbarColors();
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: currentPallet.background + "b2",
      }}
    >
      <Navbar />
      <Outlet />
    </main>
  );
}
