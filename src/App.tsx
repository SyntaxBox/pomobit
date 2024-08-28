import { PomodoroClock } from "./components/pomodoro-clock";
import { useUI } from "./hooks";

function App() {
  const { workPallet, breakPallet } = useUI();
  const background = `linear-gradient( ${workPallet.background} , ${breakPallet.background}`;
  return (
    <div
      className="h-screen"
      style={{
        background,
      }}
    >
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <PomodoroClock />
    </div>
  );
}

export default App;
