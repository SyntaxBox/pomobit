import { PauseButton, ResetButton } from "./components";
import { PomodoroClock } from "./components/pomodoro-clock";
import { usePomodoro, useUI } from "./hooks";
import { usePomodoroStore } from "./store";

function App() {
  const { workPallet, breakPallet } = useUI();
  const { getGradientPercentage } = usePomodoro();
  const { startTimer, pauseTimer, resetTimer, isBreak, isRunning } =
    usePomodoroStore();

  const percentage = getGradientPercentage();
  const transitionWidth = 20; // Adjust this value to control the smoothness

  const background = isBreak
    ? `linear-gradient( 
      ${breakPallet.background} ${percentage - transitionWidth / 2}%, 
      ${workPallet.background} ${percentage + transitionWidth / 2}%)`
    : `linear-gradient( 
      ${workPallet.background} ${percentage - transitionWidth / 2}%, 
      ${breakPallet.background} ${percentage + transitionWidth / 2}%)`;
  return (
    <div
      className="h-screen"
      style={{
        background,
      }}
    >
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <PomodoroClock />
      <PauseButton
        onPause={pauseTimer}
        onResume={startTimer}
        reset={!isRunning}
      />
      {!isBreak && <ResetButton onClick={resetTimer} />}
    </div>
  );
}

export default App;
