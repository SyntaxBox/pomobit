import { useSettings } from "./useSettings";

export function useNotifications() {
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

  const sendNotification = async ({
    title,
    ...args
  }: {
    title: string;
    body?: string;
    tag?: string;
  }) => {
    if (!isNotificationEnabled) {
      console.warn("Notification disabled");
      return;
    }
    if (notificationPermission !== "granted") {
      await requestPermission();
      console.warn("Notification permission not granted");
    }

    try {
      new Notification(title, {
        ...args,
        icon: "./icon.svg",
        badge: "./icon.svg",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return {
    requestPermission,
    sendNotification,
  };
}
