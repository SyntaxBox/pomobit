import { Clock } from "../ui";

export function PomodoroClock() {
  const time = {
    min: 24,
    sec: 4,
  };

  return <Clock {...time} />;
}
