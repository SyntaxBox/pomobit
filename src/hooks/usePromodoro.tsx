import { useEffect, useState } from "react";
import { usePomodoroStore } from "../store/";
import { useSettings } from "./useSettings";

interface Session {
  start: number;
  end: number;
  type: "BREAK" | "WORK";
}

export function usePomodoro() {
  const {
    isRunning,
    startTimer,
    tick,
    timeLeft,
    isBreak,
    switchMode,
    pauseTimer,
    resetTimer,
    updateTimeLeft,
    setWorkShift,
    setBreakShift,
  } = usePomodoroStore();
  const { workShift, breakShift } = useSettings();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      // If the timer just started, record the start time
      if (session === null) {
        setSession({
          start: Date.now(),
          end: 0,
          type: isBreak ? "BREAK" : "WORK",
        });
      }

      intervalId = setInterval(() => {
        tick();

        // If timeLeft reaches zero, save the session and start the next one
        if (timeLeft === 1) {
          saveSession();
          startNextSession();
        }
      }, 1000);
    } else if (session && session.start && session.end === 0) {
      // If the timer is paused or reset, update the session end time
      setSession((prevSession) =>
        prevSession ? { ...prevSession, end: Date.now() } : null,
      );
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, session, tick]);

  const saveSession = () => {
    if (session) {
      const today = new Date().toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD
      const existingSessions = JSON.parse(localStorage.getItem(today) || "[]");

      // Save the session in localStorage
      const updatedSessions = [
        ...existingSessions,
        { start: session.start, end: Date.now(), type: session.type },
      ];
      localStorage.setItem(today, JSON.stringify(updatedSessions));

      // Reset the session
      setSession(null);
    }
  };

  const getGradientPercentage = () => {
    return (timeLeft / (isBreak ? breakShift : workShift)) * 100;
  };

  const startNextSession = () => {
    switchMode();
    startTimer();
  };

  return {
    getGradientPercentage,
    isRunning,
    startTimer,
    timeLeft,
    isBreak,
    workShift,
    breakShift,
    switchMode,
    pauseTimer,
    resetTimer,
    updateTimeLeft,
    setWorkShift,
    setBreakShift,
  };
}
