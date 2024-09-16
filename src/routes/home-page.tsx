import { PauseButton, ResetButton } from "../components";
import { PomodoroClock } from "../components/pomodoro-clock";
import { usePomodoro, useUI } from "../hooks";
import { usePomodoroStore } from "../stores";

export default function HomePage() {
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
    <section
      className="flex flex-col items-center justify-center gap-3 h-full flex-grow"
      style={{
        background,
      }}
    >
      <PomodoroClock />
      <div className="flex gap-3">
        <PauseButton
          onPause={pauseTimer}
          onResume={startTimer}
          reset={!isRunning}
        />

        <ResetButton onClick={resetTimer} />
      </div>
    </section>
  );
}
