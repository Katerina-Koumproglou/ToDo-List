import { useState } from "react";
import { useStorage } from "./useStorage";

export const useTasks = () => {
  //Set idCounter for tasks
  const [idCounter, setIdCounter] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  //Edit tasks
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState("");

  //Set the useStates with the stored data
  useStorage(setIdCounter, setTasks);

  //Save tasks to localStorage
  const saveTasks = (tasks, idCounter) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("idCounter", idCounter.toString());
  };

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

  //Add task button
  const handleAddButton = () => {
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    const newTask = {
      id: idCounter,
      text: trimmedText,
      completed: false,
      reminder: null,
    };

    const updatedTasks = [...tasks, newTask];
    const newIdCounter = idCounter + 1;

    setTasks(updatedTasks);
    setIdCounter(newIdCounter);

    saveTasks(updatedTasks, newIdCounter);
    setTaskText("");
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks, idCounter);
  };

  //Edit task
  const startEdit = (id, text) => {
    setEditTask(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task,
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks, idCounter);
    setEditTask(null);
    setEditText("");
  };

  //Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks, idCounter);
  };

  return {
    tasks,
    taskText,
    setTaskText,
    editTask,
    editText,
    setEditText,
    updateTaskReminder,
    handleAddButton,
    toggleComplete,
    startEdit,
    saveEdit,
    deleteTask,
  };
};
