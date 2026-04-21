//This component handles the UI when the user clicks on the edit icon to edit his task input

import { EditInput } from "../../styles/Inputs";
import { IconButton } from "../../styles/Buttons";
import { SaveEditIcon } from "./Icons";

const TaskEditMode = ({ editText, setEditText, saveEdit, task }) => {
  return (
    <>
      <EditInput
        $editing
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") saveEdit(task);
        }}
      />
      <IconButton $edit onClick={() => saveEdit(task)}>
        {/* Save edit icon */}
        <SaveEditIcon />
      </IconButton>
    </>
  );
};

export default TaskEditMode;
