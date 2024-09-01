import { Link } from "react-router-dom";
import { useUI } from "../hooks";
import { Container } from "../ui";

export function Navbar() {
  const { currentPallet } = useUI();
  return (
    <nav
      style={{
        background: currentPallet.background + "90",
      }}
      className="h-14 shadow-lg shadow-black/5 z-10 sticky top-0 left-0"
    >
      <Container as="div" className="flex justify-between py-2">
        <Link to="/">
          <img src="/icon.svg" alt="logo icon" className="w-24 h-24 -mt-6" />
        </Link>

        <div
          style={{
            color: currentPallet.text1,
          }}
          className="flex items-center gap-3 text-lg font-meduim"
        >
          <Link to="/settings" className="hover:underline">
            Settings
          </Link>
          <Link to="/analytics" className="hover:underline">
            Analytics
          </Link>
        </div>
      </Container>
    </nav>
  );
}
