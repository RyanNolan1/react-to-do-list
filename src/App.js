import moonIcon from "./images/icon-moon.svg";

export default function App() {
  return (
    <div className="app">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="title-toggle-container">
        <h1>T O D O</h1>
        <img src={moonIcon} alt="Moon Icon" />
      </div>
      <AddTask />
      <Task task="Task 1" />
      <Task task="Task 2" />
      <Task task="Task 3" />
      <Task task="Task 4" />
      <Task task="Task 5" />
      <Task task="Task 6" />
    </header>
  );
}

function AddTask() {
  return (
    <div className="add-task-container">
      <input id="add-task-radio" type="radio" name="add-task-radio"></input>
      <input
        id="add-task-text"
        type="text"
        name="add-task-text"
        placeholder="Create a new todo…"
      ></input>
    </div>
  );
}

function Task(props) {
  return (
    <div className="task-container">
      <input id="task-radio" type="radio" name="task-radio"></input>
      <input
        id="task-text"
        type="text"
        name="ask-text"
        placeholder={props.task}
      ></input>
    </div>
  );
}
