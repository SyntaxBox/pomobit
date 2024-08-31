import { useUI } from "../hooks";
import { TimeUtils } from "../lib/utils";
import { usePomodoroStore } from "../store";
import { Clock } from "../ui";

export function PomodoroClock() {
  const { workPallet, breakPallet } = useUI();
  const { isBreak, timeLeft } = usePomodoroStore();
  const time = TimeUtils.getMinutesAndSeconds(timeLeft);
  return <Clock {...time} pallet={isBreak ? breakPallet : workPallet} />;
}
