import moonIcon from "./images/icon-moon.svg";
import cross from "./images/icon-cross.svg";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Header />
      <div className="task-shadow">
        <AddTask onAddItems={ handleAddItems } />
        <ToDoList items={items} />
        <CountClear />
        <Filter />
      </div>
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

    </header>
  );
}

function ToDoList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <Task task={item.task} id={index} key={index}></Task>
      ))}
    </div>
  );
}

function AddTask({ onAddItems }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { task };
    onAddItems(newItem);
    console.log(newItem);
    setTask("");
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
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
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
