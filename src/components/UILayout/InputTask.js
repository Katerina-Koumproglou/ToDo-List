import { AddButton } from "../../styles/Buttons.js";
import { TaskInput } from "../../styles/Inputs.js";
import { InputWrapper } from "../../styles/Wrappers.js";

const InputTask = ({ taskText, setTaskText, handleAddButton }) => {
  return (
    <InputWrapper>
      <TaskInput
        type="text"
        placeholder="Enter your task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddButton();
        }}
      />
      <AddButton onClick={handleAddButton}>ADD</AddButton>
    </InputWrapper>
  );
};

export default InputTask;
