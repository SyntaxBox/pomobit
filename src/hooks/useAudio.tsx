import { useCallback, useRef, useEffect } from "react";
import { useAudioStore } from "../store";

export function useAudio() {
  const { workCue, breakCue, isAudioCuesAllowed, isPlaying, setIsPlaying } =
    useAudioStore();
  const audioRef = useRef(new Audio());

  const playAudio = useCallback((source: string) => {
    if (!isAudioCuesAllowed) {
      console.warn("Audio cues are not allowed. No audio will play.");
      return;
    }
    const audio = audioRef.current;

    if (source) {
      if (source.startsWith("data:audio")) {
        audio.src = source;
      } else {
        audio.src = source;
      }
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  }, []);

  const playNotification = useCallback(
    (type: "workCue" | "breakCue") => {
      if (!workCue || !breakCue) {
        console.warn(
          "Notification audio path is not configured. No audio will play.",
        );
        return;
      }
      const soundPath = type === "workCue" ? workCue : breakCue;
      if (soundPath) {
        playAudio(soundPath);
      } else {
        console.log(soundPath);
        console.error("Invalid notification type");
      }
    },
    [playAudio, workCue, breakCue, isAudioCuesAllowed],
  );

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  return {
    isPlaying,
    playAudio,
    playNotification,
    stopAudio,
  };
}
