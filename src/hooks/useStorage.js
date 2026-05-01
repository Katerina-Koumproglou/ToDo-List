import { useRef } from "react";

export const useStorage = (setIdCounter, setTasks) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    const savedIdCounter = localStorage.getItem("idCounter");
    const savedTasks = localStorage.getItem("tasks");

    if (savedIdCounter) setIdCounter(parseInt(savedIdCounter, 10));
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(
        parsedTasks.map((task) => ({
          ...task,
          reminder: task.reminder ? new Date(task.reminder) : null,
        })),
      );
    }

    initialized.current = true;
  }
};
