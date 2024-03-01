import moonIcon from "./images/icon-moon.svg";
import cross from "./images/icon-cross.svg";

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
      <div className="container title-toggle">
        <h1>T O D O</h1>
        <img src={moonIcon} alt="Moon Icon" />
      </div>
      <AddTask />
      <div className="task-shadow">
        <Task task="Task 1" />
        <Task task="Task 2" />
        <Task task="Task 3" />
        <Task task="Task 4" />
        <Task task="Task 5" />
        <Task task="Task 6" />
        <CountClear />
        <Filter />
      </div>
    </header>
  );
}

function AddTask() {
  return (
    <div className="container add-task">
      <label htmlFor="add-task-checkbox">
        <input
          id="add-task-checkbox"
          type="checkbox"
          name="add-task-checkbox"
          className="checkbox"
        ></input>
        <div className="custom-checkbox"></div>
      </label>
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
    <div className="container task">
      <label htmlFor="task-checkbox" className="checkbox-label">
        <input id="task-checkbox" type="checkbox" name="task-checkbox" className="checkbox"></input>
        <div className="custom-checkbox" ></div>
      </label>
      <input
        id="task-text"
        type="text"
        name="ask-text"
        placeholder={props.task}
      ></input>
      <img src={cross} alt="Cross Icon" className="cross" />
    </div>
  );
}

function CountClear() {
  return (
    <div className="container count-clear">
      <p className="item-count">0 Items Left</p>
      <button>Clear Completed</button>
    </div>
  );
}

function Filter() {
  return (
    <div className="container filter">
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
}
