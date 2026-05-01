//Save tasks to localStorage
export const saveTasks = (tasks, idCounter) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("idCounter", idCounter.toString());
};
