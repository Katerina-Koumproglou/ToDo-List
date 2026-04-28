export const loadIdCounter = () => {
  const savedIdCounter = localStorage.getItem("idCounter");
  return savedIdCounter ? parseInt(savedIdCounter, 10) : 1;
};

export const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) return [];

  const parsedTasks = JSON.parse(savedTasks);

  return parsedTasks.map((task) => ({
    ...task,
    reminder: task.reminder ? new Date(task.reminder) : null,
  }));
};
