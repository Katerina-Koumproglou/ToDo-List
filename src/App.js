import { ToDoList } from "./pages/ToDoList";
import { CalendarStyles } from "./styles/CalendarStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <CalendarStyles />
      <header>
        <h1>ToDo List</h1>
      </header>
      <ToDoList />
      <ToastContainer />
    </div>
  );
};

export default App;
