import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useVisionHealth } from "../hooks";

export default function Root() {
  useVisionHealth();
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </main>
  );
}
