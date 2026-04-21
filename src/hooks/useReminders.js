import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import notifSound from "../assets/sounds/notif-sound.mp3";

export const useReminders = (tasks) => {
  //Reminders
  const getSavedReminders = () => {
    const savedReminders = localStorage.getItem("reminders");

    if (!savedReminders) return {};

    const parsedReminders = JSON.parse(savedReminders);
    const parsedDates = {};
    for (const id in parsedReminders) {
      parsedDates[id] = parsedReminders[id]
        ? new Date(parsedReminders[id])
        : null;
    }

    return parsedDates;
  };

  const [reminders, setReminders] = useState(getSavedReminders);
  const [showReminderInput, setShowReminderInput] = useState({});

  //Save reminders to localStorage
  const saveReminders = (reminders) => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  };

  //Needs editing with the async - await
  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      return await Notification.requestPermission();
    }
    return "granted";
  };

  //Set reminder
  const handleSetReminder = (id, dateTime) => {
    requestNotificationPermission();
    if (dateTime && dateTime > new Date()) {
      const updatedReminders = { ...reminders, [id]: dateTime };

      setReminders(updatedReminders);
      saveReminders(updatedReminders);

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

  //Reminder goes off
  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        const reminderTime = reminders[task.id];
        if (reminderTime && now >= reminderTime) {
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
          const updatedReminders = { ...reminders, [task.id]: null };
          setReminders(updatedReminders);
          saveReminders(updatedReminders);
        }
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [tasks, reminders]);

  return {
    reminders,
    showReminderInput,
    handleSetReminder,
    toggleReminderInput,
  };
};
