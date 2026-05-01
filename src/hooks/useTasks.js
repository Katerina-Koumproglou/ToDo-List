import { useState, useRef } from "react";
import { useStorage } from "./useStorage";
import { saveEdit, startEdit } from "../functions/editTask";
import { saveTasks } from "../functions/saveTasks.js";
import {
  deleteTask,
  handleAddButton,
  toggleComplete,
} from "../functions/taskActions.js";
import { handleSetReminder } from "../functions/reminderActions.js";
import { startReminderCountdown } from "../functions/startReminderCountdown.js";

export const useTasks = () => {
  //Set idCounter for tasks
  const [idCounter, setIdCounter] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  //Edit tasks
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState("");

  const [showReminderInput, setShowReminderInput] = useState({});

  //Set the useStates with the stored data
  useStorage(setIdCounter, setTasks);

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

  //Update the reminder for each task
  const updateTaskReminder = (id, dateTime) => {
    setTasks((prevTasks) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, reminder: dateTime } : task,
      );
      saveTasks(updatedTasks, idCounter);
      return updatedTasks;
    });
  };

  return {
    tasks,
    taskText,
    setTaskText,
    editTask,
    editText,
    setEditText,
    handleAddButton: () =>
      handleAddButton(
        taskText,
        idCounter,
        tasks,
        setTasks,
        setIdCounter,
        setTaskText,
      ),
    toggleComplete: (id) => toggleComplete(id, tasks, setTasks, idCounter),
    startEdit: (id, text) => startEdit(id, text, setEditTask, setEditText),
    saveEdit: (id) =>
      saveEdit(
        id,
        tasks,
        editText,
        idCounter,
        setTasks,
        setEditTask,
        setEditText,
      ),
    deleteTask: (id) => deleteTask(id, tasks, setTasks, idCounter),
    handleSetReminder: (id, dateTime) =>
      handleSetReminder(
        id,
        dateTime,
        tasks,
        timerRef,
        updateTaskReminder,
        setShowReminderInput,
      ),
    toggleReminderInput: (id) =>
      setShowReminderInput((prev) => ({
        ...prev,
        [id]: !prev[id],
      })),
    showReminderInput,
  };
};
