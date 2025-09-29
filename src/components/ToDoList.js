import { useState } from "react";
import "./ToDoList.css";

var idCounter = 1;

export const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const handleAddButton = () => {
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    const newTask = {
      id: idCounter,
      text: trimmedText,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    idCounter++;
    setTaskText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddButton();
    }
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="to-do">
      <div className="wrapper">
        <div className="task-input-list">
          <input
            className="task-input"
            type="text"
            placeholder="Enter your task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn" onClick={handleAddButton}>
            ADD
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                className="checkbox"
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path
                      fill="#f57a00"
                      d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path
                      fill="#f57a00"
                      d="M480 144C488.8 144 496 151.2 496 160L496 480C496 488.8 488.8 496 480 496L160 496C151.2 496 144 488.8 144 480L144 160C144 151.2 151.2 144 160 144L480 144zM160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96z"
                    />
                  </svg>
                )}
              </span>
              <span
                className={`task-completed ${task.completed ? "checked" : ""}`}
              >
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
