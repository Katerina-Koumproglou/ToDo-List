import { saveTasks } from "./saveTasks.js";

//Edit task
export const startEdit = (id, text, setEditTask, setEditText) => {
  setEditTask(id);
  setEditText(text);
};

export const saveEdit = (
  id,
  tasks,
  editText,
  idCounter,
  setTasks,
  setEditTask,
  setEditText,
) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, text: editText } : task,
  );

  setTasks(updatedTasks);
  saveTasks(updatedTasks, idCounter);
  setEditTask(null);
  setEditText("");
};
