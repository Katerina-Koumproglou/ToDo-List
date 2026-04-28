import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { startReminderCountdown } from "../functions/startReminderCountdown.js";

export const useReminders = (tasks, updateTaskReminder) => {
  const [showReminderInput, setShowReminderInput] = useState({});

  //Keeps track of IDs of the active timers so that the old reminders/alarms can be canceled
  const timerRef = useRef({});

  //When the page loads for the first time, the appLoadedRef checks for future reminders and it starts their countdown
  const appLoadedRef = useRef(false);
  if (!appLoadedRef.current) {
    tasks.forEach((task) => {
      if (task.reminder && task.reminder > new Date()) {
        startReminderCountdown(task, task.reminder, timerRef);
      }
    });
    appLoadedRef.current = true;
  }

  //Needs editing with the async - await
  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      return await Notification.requestPermission();
    }
    return "granted";
  };

  //Set reminder
  const handleSetReminder = async (id, dateTime) => {
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

  const toggleReminderInput = (id) => {
    setShowReminderInput((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return {
    showReminderInput,
    handleSetReminder,
    toggleReminderInput,
  };
};
