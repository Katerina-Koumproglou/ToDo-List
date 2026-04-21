import "react-datepicker/dist/react-datepicker.css";
import InputTask from "../components/UILayout/InputTask.js";
import { Checkbox } from "../styles/Buttons.js";
import { MainWrapper, PageWrapper } from "../styles/Wrappers.js";
import { List, ListItem } from "../styles/Lists.js";
import { CheckboxIcon, TickIcon } from "../components/UILayout/Icons.js";
import { useTasks } from "../hooks/useTasks.js";
import { useReminders } from "../hooks/useReminders.js";
import TaskEditMode from "../components/UILayout/TaskEditMode.js";
import TaskDefaultContent from "../components/UILayout/TaskDefaultContent.js";

export const ToDoList = () => {
  const {
    tasks,
    taskText,
    setTaskText,
    editTask,
    editText,
    setEditText,
    handleAddButton,
    toggleComplete,
    startEdit,
    saveEdit,
    deleteTask,
  } = useTasks();

  const {
    reminders,
    showReminderInput,
    handleSetReminder,
    toggleReminderInput,
  } = useReminders(tasks);

  return (
    <PageWrapper>
      <MainWrapper>
        <InputTask
          taskText={taskText}
          setTaskText={setTaskText}
          handleAddButton={handleAddButton}
        />
        <List>
          {/* Creating checkbox for task: square icon for uncompleted / tick icon for completed */}
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <Checkbox onClick={() => toggleComplete(task.id)}>
                {task.completed ? (
                  // Tick icon
                  <TickIcon />
                ) : (
                  //Checkbox icon
                  <CheckboxIcon />
                )}
              </Checkbox>

              {/* Set edit button */}
              {editTask === task.id ? (
                <TaskEditMode
                  editText={editText}
                  setEditText={setEditText}
                  saveEdit={saveEdit}
                  task={task.id}
                />
              ) : (
                <TaskDefaultContent
                  task={task}
                  toggleReminderInput={toggleReminderInput}
                  showReminderInput={showReminderInput}
                  reminders={reminders}
                  handleSetReminder={handleSetReminder}
                  startEdit={startEdit}
                  deleteTask={deleteTask}
                />
              )}
            </ListItem>
          ))}
        </List>
      </MainWrapper>
    </PageWrapper>
  );
};
