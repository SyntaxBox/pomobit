import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function Root() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </main>
  );
}
