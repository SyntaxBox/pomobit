import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
