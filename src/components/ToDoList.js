import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ToDoList.css";
import notifSound from "../assets/sounds/notif-sound.mp3";

export const ToDoList = () => {
  //Set idCounter for tasks
  const [idCounter, setIdCounter] = useState(() => {
    const savedIdCounter = localStorage.getItem("idCounter");
    return savedIdCounter ? parseInt(savedIdCounter, 10) : 1;
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskText, setTaskText] = useState("");

  //Edit tasks
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState("");

  //Reminders
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("reminders");
    return savedReminders ? JSON.parse(savedReminders) : {};
  });
  const [showReminderInput, setShowReminderInput] = useState({});

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  //Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedIdCounter = localStorage.getItem("idCounter");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    } else {
      console.log("Failed to retreive tasks");
    }

    const savedReminders = localStorage.getItem("reminders");
    if (savedReminders) {
      const parsedReminders = JSON.parse(savedReminders);
      const parsedDates = {};
      for (const id in parsedReminders) {
        parsedDates[id] = new Date(parsedReminders[id]);
      }
      setReminders(parsedDates);
    }
  }, []);

  //Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("idCounter", idCounter.toString());
  }, [tasks, idCounter]);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  //Add task button
  const handleAddButton = () => {
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    const newTask = {
      id: idCounter,
      text: trimmedText,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setIdCounter((prev) => prev + 1);
    setTaskText("");
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //Edit task
  const startEdit = (id, text) => {
    setEditTask(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: editText } : task))
    );
    setEditTask(null);
    setEditText("");
  };

  //Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  //Set reminder
  const handleSetReminder = (id, dateTime) => {
    if (dateTime && dateTime > new Date()) {
      setReminders((prev) => ({ ...prev, [id]: dateTime }));
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
              console.warn("User needs to interact, audio can't play", err)
            );

          //Show notification
          toast.info(`Reminder for task: ${task.text}`, {
            autoClose: 5000,
            position: "top-center",
          });
          setReminders((prev) => ({ ...prev, [task.id]: null }));
        }
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [tasks, reminders]);

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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddButton();
            }}
          />
          <button className="add-btn" onClick={handleAddButton}>
            ADD
          </button>
        </div>
        <ul>
          {/* Creating checkbox for task: square icon for uncompleted / tick icon for completed */}
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

              {/* Set edit button */}
              {editTask === task.id ? (
                <>
                  <input
                    className={`task-edit-input ${
                      editTask === task.id ? "editing" : ""
                    }`}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(task.id);
                    }}
                  />
                  <button
                    className="icon-btn edit-btn"
                    onClick={() => saveEdit(task.id, task.text)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        fill="#f57a00"
                        d="M480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`task-completed ${
                      task.completed ? "checked" : ""
                    }`}
                  >
                    <span className="task-text">{task.text}</span>
                  </span>

                  {/* Reminder icon */}
                  <button
                    className="icon-btn reminder-btn"
                    onClick={() => toggleReminderInput(task.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        fill="#f57a00"
                        d="M568.4 196.5C563.9 207 550 206.3 543.5 196.9C515.7 156.9 477.4 124.7 432.5 104.3C422.1 99.6 418.8 86 428.4 79.7C443.4 69.8 461.4 64 480.7 64C533.3 64 575.9 106.6 575.9 159.2C575.9 172.4 573.2 185 568.3 196.5zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C162.6 124.7 124.3 156.9 96.4 196.9zM454.2 531.4C416.8 559.4 370.3 576 320 576C269.7 576 223.2 559.4 185.9 531.4L150.6 566.6C138.1 579.1 117.8 579.1 105.3 566.6C92.8 554.1 92.8 533.8 105.3 521.3L140.5 486.1C112.6 448.8 96 402.3 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 402.3 527.4 448.8 499.4 486.2L534.6 521.4C547.1 533.9 547.1 554.2 534.6 566.7C522.1 579.2 501.8 579.2 489.3 566.7L454.1 531.5zM344 248C344 234.7 333.3 224 320 224C306.7 224 296 234.7 296 248L296 352C296 358.4 298.5 364.5 303 369L359 425C368.4 434.4 383.6 434.4 392.9 425C402.2 415.6 402.3 400.4 392.9 391.1L343.9 342.1L343.9 248z"
                      />
                    </svg>
                  </button>
                  {/* Only show calendar when toggled */}
                  {showReminderInput[task.id] && (
                    <DatePicker
                      selected={reminders[task.id] || null}
                      onChange={(date) => handleSetReminder(task.id, date)}
                      placeholderText="Select date/time..."
                      className="reminder-input"
                      showTimeSelect
                      timeIntervals={1}
                      dateFormat="Pp"
                      withPortal
                    />
                  )}

                  <button
                    className="icon-btn edit-btn"
                    onClick={() => startEdit(task.id, task.text)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        fill="#f57a00"
                        d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"
                      />
                    </svg>
                  </button>

                  {/* Delete Button */}
                  <button
                    className="icon-btn delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        fill="#f57a00"
                        d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"
                      />
                    </svg>
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};
