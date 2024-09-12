import { useSettings } from "./useSettings";

interface NotificationOptions {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
}

export function useNotification() {
  const { isNotificationEnabled, notificationPermission, updateSettings } =
    useSettings();

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      updateSettings({ notificationPermission: "default" });
      return;
    }

    try {
      const result = await Notification.requestPermission();
      updateSettings({ notificationPermission: result });
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const sendNotification = async (
    title: string,
    options: NotificationOptions = {},
  ) => {
    if (isNotificationEnabled) {
      console.warn("Notification disabled");
      return;
    }
    if (notificationPermission !== "granted") {
      await requestPermission();
      console.warn("Notification permission not granted");
    }

    try {
      new Notification(title, options);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return {
    requestPermission,
    sendNotification,
  };
}
