import { toast } from "react-toastify";
import notifSound from "../assets/sounds/notif-sound.mp3";

export const startReminderCountdown = (task, dateTime, timerRef) => {
  if (timerRef.current[task.id]) {
    clearTimeout(timerRef.current[task.id]);
  }

  const reminderCountdown = new Date(dateTime).getTime() - Date.now();

  timerRef.current[task.id] = setTimeout(() => {
    const sound = new Audio(notifSound);
    sound
      .play()
      .catch((err) =>
        console.warn("User needs to interact, audio can't play", err),
      );

    //Show notification
    toast.info(`Reminder for task: ${task.text}`, {
      autoClose: 5000,
      position: "top-center",
    });
  }, reminderCountdown);
};
