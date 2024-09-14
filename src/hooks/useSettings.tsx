import { useCallback, useEffect } from "react";
import {
  useAudioStore,
  useNotificationStore,
  usePomodoroStore,
  useUIStore,
  useVisionHealthStore,
} from "../store";
import { useLocalStorage } from "./useLocalStorage";
import notification0 from "../assets/audio/notification0.mp3";
import notification1 from "../assets/audio/notification1.mp3";
const DEFAULT_WORK_HUE = 99;
const DEFAULT_BREAK_HUE = 37;
const DEFAULT_WORK_SHIFT = 25 * 60; // 25 minutes;
const DEFAULT_BREAK_SHIFT = 5 * 60; // 5 minutes;
const DEFAULT_AUTO_START = true;
const DEFAULT_AUDIO_CUES = true;
const DEFAULT_WORK_CUE = notification0;
const DEFAULT_BREAK_CUE = notification1;
const DEFAULT_NOTIFICATION_PERMISSION = "default";
const DEFAULT_IS_NOTIFICATION_ENABLED = true;
const DEFAULT_IS_VISION_HEALTH_ENABLED = true;

const DEFAULT_SETTINGS = {
  workHue: DEFAULT_WORK_HUE,
  workShift: DEFAULT_WORK_SHIFT,
  breakShift: DEFAULT_BREAK_SHIFT,
  breakHue: DEFAULT_BREAK_HUE,
  autoStart: DEFAULT_AUTO_START,
  isAudioCuesAllowed: DEFAULT_AUDIO_CUES,
  workCue: DEFAULT_WORK_CUE,
  breakCue: DEFAULT_BREAK_CUE,
  notificationPermission:
    DEFAULT_NOTIFICATION_PERMISSION as NotificationPermission,
  isNotificationEnabled: DEFAULT_IS_NOTIFICATION_ENABLED,
  isVisionHealthEnabled: DEFAULT_IS_VISION_HEALTH_ENABLED,
};

export function useSettings() {
  const { workHue, breakHue, setWorkHue, setBreakHue } = useUIStore();
  const {
    workShift,
    breakShift,
    setWorkShift,
    setBreakShift,
    autoStart,
    setAutoStart,
  } = usePomodoroStore();

  const {
    isAudioCuesAllowed,
    setWorkCue,
    setBreakCue,
    workCue,
    breakCue,
    setIsAudioCuesAllowed,
  } = useAudioStore();

  const {
    setNotificationPermission,
    notificationPermission,
    isNotificationEnabled,
    setIsNotificationEnabled,
  } = useNotificationStore();

  const { isVisionHealthEnabled, setIsVisionHealthEnabled } =
    useVisionHealthStore();
  const [localSettings, setLocalSettings] = useLocalStorage(
    "settings",
    DEFAULT_SETTINGS,
  );

  useEffect(() => {
    if (workHue === undefined || breakHue === undefined) {
      setWorkHue(localSettings.workHue);
      setBreakHue(localSettings.breakHue);
    }
    if (workShift === undefined || breakShift === undefined) {
      setWorkShift(localSettings.workShift);
      setBreakShift(localSettings.breakShift);
    }
    if (autoStart === undefined) {
      setAutoStart(localSettings.autoStart);
    }
    if (isAudioCuesAllowed === undefined) {
      setIsAudioCuesAllowed(localSettings.isAudioCuesAllowed);
    }
    if (workCue === undefined) {
      setWorkCue(localSettings.workCue);
    }
    if (breakCue === undefined) {
      setBreakCue(localSettings.breakCue);
    }
    if (notificationPermission === undefined) {
      setNotificationPermission(localSettings.notificationPermission);
    }
    if (isNotificationEnabled === undefined) {
      setIsNotificationEnabled(localSettings.isNotificationEnabled);
    }
    if (isVisionHealthEnabled === undefined) {
      setIsVisionHealthEnabled(localSettings.isVisionHealthEnabled);
    }
  }, []);

  const updateSettings = useCallback(
    (updates: Partial<typeof localSettings>) => {
      setLocalSettings({ ...localSettings, ...updates });
      if (updates.workHue !== undefined) {
        setWorkHue(updates.workHue);
      }
      if (updates.breakHue !== undefined) {
        setBreakHue(updates.breakHue);
      }
      if (updates.workShift !== undefined) {
        setWorkShift(updates.workShift);
      }
      if (updates.breakShift !== undefined) {
        setBreakShift(updates.breakShift);
      }
      if (updates.autoStart !== undefined) {
        setAutoStart(updates.autoStart);
      }
      if (updates.isAudioCuesAllowed !== undefined) {
        setIsAudioCuesAllowed(updates.isAudioCuesAllowed);
      }
      if (updates.workCue !== undefined) {
        setWorkCue(updates.workCue);
      }
      if (updates.breakCue !== undefined) {
        setBreakCue(updates.breakCue);
      }
      if (updates.notificationPermission !== undefined) {
        setNotificationPermission(updates.notificationPermission);
      }
      if (updates.isNotificationEnabled !== undefined) {
        setIsNotificationEnabled(updates.isNotificationEnabled);
      }
      if (updates.isVisionHealthEnabled !== undefined) {
        setIsVisionHealthEnabled(updates.isVisionHealthEnabled);
      }
    },

    [setLocalSettings],
  );
  return {
    workHue: workHue ?? DEFAULT_WORK_HUE,
    breakHue: breakHue ?? DEFAULT_BREAK_HUE,
    workShift: workShift ?? DEFAULT_WORK_SHIFT,
    breakShift: breakShift ?? DEFAULT_BREAK_SHIFT,
    autoStart: autoStart ?? DEFAULT_AUTO_START,
    isAudioCuesAllowed: isAudioCuesAllowed ?? DEFAULT_AUDIO_CUES,
    workCue: workCue ?? DEFAULT_WORK_CUE,
    breakCue: breakCue ?? DEFAULT_BREAK_CUE,
    notificationPermission:
      notificationPermission ?? DEFAULT_NOTIFICATION_PERMISSION,
    isNotificationEnabled:
      isNotificationEnabled ?? DEFAULT_IS_NOTIFICATION_ENABLED,
    isVisionHealthEnabled:
      isVisionHealthEnabled ?? DEFAULT_IS_VISION_HEALTH_ENABLED,
    localSettings,
    updateSettings,
    DEFAULT_SETTINGS,
  };
}
