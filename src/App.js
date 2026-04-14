import { ToDoList } from "./components/ToDoList";
import { CalendarStyles } from "./styles/CalendarStyles";

const App = () => {
  return (
    <div className="App">
      <CalendarStyles />
      <header>
        <h1>ToDo List</h1>
      </header>
      <ToDoList />
    </div>
  );
};

export default App;
