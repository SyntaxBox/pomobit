import { useUI } from "../hooks";
import { Clock } from "../ui";

export function PomodoroClock() {
  const { workPallet, breakPallet } = useUI();
  const time = {
    min: 24,
    sec: 4,
  };

  return <Clock {...time} pallet={breakPallet} />;
}
