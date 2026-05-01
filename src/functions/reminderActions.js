import { saveTasks } from "./saveTasks";
import { toast } from "react-toastify";

//Needs editing with the async - await
const requestNotificationPermission = async () => {
  if ("Notification" in window && Notification.permission !== "granted") {
    return await Notification.requestPermission();
  }
  return "granted";
};

//Set reminder
export const handleSetReminder = async (
  id,
  dateTime,
  tasks,
  timerRef,
  updateTaskReminder,
  setShowReminderInput,
) => {
  const permission = await requestNotificationPermission();
  if (permission !== "granted") {
    toast.error("Notifications are not allowed.");
    return;
  }

  if (dateTime && dateTime > new Date()) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      startReminderCountdown(task, dateTime, timerRef);
    }

    updateTaskReminder(id, dateTime);

    toast.success("Reminder set!");
    setShowReminderInput((prev) => ({ ...prev, [id]: false }));
  } else {
    toast.error("Please pick a future time.");
  }
};
