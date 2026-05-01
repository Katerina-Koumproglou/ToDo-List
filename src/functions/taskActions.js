import { saveTasks } from "./saveTasks";

//Add task button
export const handleAddButton = (
  taskText,
  idCounter,
  tasks,
  setTasks,
  setIdCounter,
  setTaskText,
) => {
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

export const toggleComplete = (id, tasks, setTasks, idCounter) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );

  setTasks(updatedTasks);
  saveTasks(updatedTasks, idCounter);
};

//Delete task
export const deleteTask = (id, tasks, setTasks, idCounter) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
  saveTasks(updatedTasks, idCounter);
};
