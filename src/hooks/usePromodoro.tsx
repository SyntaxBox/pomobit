import { useEffect, useState } from "react";
import { usePomodoroStore } from "../store/";

interface Session {
  start: number;
  end: number;
}

export function usePomodoro() {
  const { isRunning, tick, timeLeft, isBreak, workDuration, breakDuration } =
    usePomodoroStore();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      // If the timer just started, record the start time
      if (session === null) {
        setSession({ start: Date.now(), end: 0 });
      }

      intervalId = setInterval(() => {
        tick();

        // If timeLeft reaches zero and it's a work session, save the session
        if (timeLeft === 1 && !isBreak) {
          saveSession();
        }
      }, 10);
    } else if (session && session.start && session.end === 0) {
      // If the timer is paused or reset, update the session end time
      setSession(
        (prevSession) => prevSession && { ...prevSession, end: Date.now() },
      );
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const saveSession = () => {
    if (session) {
      const today = new Date().toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD
      const existingSessions = JSON.parse(localStorage.getItem(today) || "[]");

      // Save the session in localStorage
      const updatedSessions = [
        ...existingSessions,
        { start: session.start, end: Date.now() },
      ];
      localStorage.setItem(today, JSON.stringify(updatedSessions));

      // Reset the session
      setSession(null);
    }
  };

  const getGradientPercentage = () => {
    return (timeLeft / (isBreak ? breakDuration : workDuration)) * 100;
  };

  return { getGradientPercentage };
}
