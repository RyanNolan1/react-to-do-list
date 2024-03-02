import moonIcon from "./images/icon-moon.svg";
import cross from "./images/icon-cross.svg";
import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="task-shadow">
        <ToDoList />
        <CountClear />
        <Filter />
      </div>
    </div>
  );
}

let ToDoListArray = [
  { task: "Jog around the park 3x" },
  { task: "10 minutes meditation" },
  { task: "Read for 1 hour" },
  { task: "Pick up groceries" },
  { task: "Complete ToDo App on Frontend Mentor" },
];

function Header() {
  return (
    <header>
      <div className="container title-toggle">
        <h1>T O D O</h1>
        <img src={moonIcon} alt="Moon Icon" />
      </div>
      <AddTask />
    </header>
  );
}

function ToDoList() {
  return (
    <div>
      {ToDoListArray.map((item, index) => (
        <Task task={item.task} id={index} key={index}></Task>
      ))}
    </div>
  );
}

function AddTask() {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(description);
  }

  return (
    <form className="container add-task" onSubmit={handleSubmit}>
      <label htmlFor="add-task-checkbox">
        <input
          id="add-task-checkbox"
          type="checkbox"
          name="add-task-checkbox"
          className="checkbox"
        />
        <div className="custom-checkbox"></div>
      </label>
      <input
        id="add-task-text"
        type="text"
        name="add-task-text"
        placeholder="Create a new todo…"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
    </form>
  );
}

function Task(props) {
  return (
    <div className="container task" key={props.index}>
      <label htmlFor={props.index} className="checkbox-label">
        <input
          id={props.index}
          type="checkbox"
          name="task-checkbox"
          className="checkbox"
        />
        <div className="custom-checkbox"></div>
      </label>
      <p type="text" name="task-text">
        {props.task}
      </p>
      <img
        src={cross}
        alt="Cross Icon"
        className="cross"
        onClick={() => RemoveTask(props.id)}
      />
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

function RemoveTask(index) {
  console.log(index);
}
