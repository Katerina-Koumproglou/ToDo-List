//This component handles the UI when the task is on its default (non-editing) mode, meaning that it handles the alarm/calendar button, start edit button and delete button

import { TaskWrapper, TaskText } from "../../styles/TaskTextStyles";
import { IconButton } from "../../styles/Buttons";
import { AlarmIcon, EditIcon, DeleteIcon } from "./Icons";
import DatePicker from "react-datepicker";

const TaskDefaultContent = ({
  task,
  toggleReminderInput,
  showReminderInput,
  reminders,
  handleSetReminder,
  startEdit,
  deleteTask,
}) => {
  return (
    <>
      <TaskWrapper $checked={task.completed}>
        <TaskText $checked={task.completed}>{task.text}</TaskText>
      </TaskWrapper>

      {/* Reminder/Alarm icon */}
      <IconButton onClick={() => toggleReminderInput(task.id)}>
        <AlarmIcon />
      </IconButton>
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

      {/* Edit Button */}
      <IconButton onClick={() => startEdit(task.id, task.text)}>
        <EditIcon />
      </IconButton>

      {/* Delete Button */}
      <IconButton onClick={() => deleteTask(task.id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default TaskDefaultContent;
