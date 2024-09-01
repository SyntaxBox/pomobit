import { Link } from "react-router-dom";
import { useUI } from "../hooks";

export function Navbar() {
  const { currentPallet } = useUI();
  return (
    <div className="h-14 py-2 px-4 flex justify-between">
      <Link to="/">
        <img src="/icon.svg" alt="logo icon" className="w-24 h-24 -mt-5" />
      </Link>

      <div
        style={{
          color: currentPallet.text1,
        }}
        className="flex items-center gap-3 text-lg"
      >
        <Link to="/settings" className="hover:underline">
          Settings
        </Link>
        <Link to="/analytics" className="hover:underline">
          Analytics
        </Link>
      </div>
    </div>
  );
}
