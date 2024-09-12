import { create } from "zustand";

export interface NotificationsState {
  notificationPermission?: NotificationPermission;
  isNotificationEnabled?: boolean;
  setNotificationPermission: (state: NotificationPermission) => void;
  setIsNotificationEnabled: (state: boolean) => void;
}

export const useNotificationStore = create<NotificationsState>((set) => ({
  setNotificationPermission: (state) => set({ notificationPermission: state }),
  setIsNotificationEnabled: (state) => set({ isNotificationEnabled: state }),
}));
