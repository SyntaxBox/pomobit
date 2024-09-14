import { useEffect } from "react";
import { useVisionHealthStore } from "../store";
import { useNotifications } from "./useNotifications";

export function useVisionHealth() {
  const isVisionHealthEnabled = useVisionHealthStore(
    (state) => state.isVisionHealthEnabled,
  );
  const { sendNotification } = useNotifications();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isVisionHealthEnabled) {
        sendNotification({
          title: "20 20 20 Rule",
          body: "Time to look away from your computer for 20 seconds!",
        });
      }
    }, 1000 * 20);

    return () => clearInterval(intervalId); // Clean up the interval
  }, [isVisionHealthEnabled, sendNotification]); // Add both dependencies
}
