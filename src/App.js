import moonIcon from "./images/icon-moon.svg";
import cross from "./images/icon-cross.svg";

export default function App() {
  return (
    <div className="app">
      <Header />
    </div>
  );
}

let ToDoListArray = [
  { task: "Clean out the refrigerator and dispose of any expired items." },
  { task: "Organize paperwork and file important documents." },
  { task: "Create a grocery list for the week and plan meals accordingly." },
  { task: "Schedule a regular exercise routine for the upcoming week." },
];

function Header() {
  return (
    <header>
      <div className="container title-toggle">
        <h1>T O D O</h1>
        <img src={moonIcon} alt="Moon Icon" />
      </div>
      <AddTask />
      <div className="task-shadow">
        <ToDoList />
        <CountClear />
        <Filter />
      </div>
    </header>
  );
}

function ToDoList() {
  return (
    <div>{ToDoListArray.map((item) => (
      <Task task={item.task}></Task>
    ))}
    </div>
  )
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
        <input
          id="task-checkbox"
          type="checkbox"
          name="task-checkbox"
          className="checkbox"
        ></input>
        <div className="custom-checkbox"></div>
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
