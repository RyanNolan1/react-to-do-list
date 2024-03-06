import moonIcon from "./images/icon-moon.svg";
import cross from "./images/icon-cross.svg";
import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    setFilteredItems((items) => [...items, item]);
  }

  function handleRemoveTask(id) {
    const filteredArray = items.filter((item) => item.id !== id);
    setItems(filteredArray);
    setFilteredItems(filteredArray);
  }

  function handleFilter(status) {
    if (status) {
      const filteredArray = items.filter((item) => item.status === status);
      setFilteredItems(filteredArray);
    } else {
      setFilteredItems(items);
    }
  }

  return (
    <div className="app">
      <Header />
      <div className="tasks-container">
        <AddTask onAddItems={handleAddItems} />
        <ToDoList handleRemoveTask={handleRemoveTask} items={filteredItems} />
        <CountClear itemCount={items.length} />
        <Filter onFilterItems={handleFilter} />
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

function ToDoList({ items, handleRemoveTask }) {
  return (
    <div>
      {items.map((item, index) => (
        <Task
          onRemoveTask={handleRemoveTask}
          item={item}
          task={item.task}
          id={index}
          key={item.id}
        ></Task>
      ))}
    </div>
  );
}

function AddTask({ onAddItems }) {
  const [task, setTask] = useState("");
  const [id, setId] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (task) {
      const newItem = { id: id, task, status: "Active" };
      onAddItems(newItem);
      setTask("");
      setId(id + 1);
    }
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

function Task({ item, onRemoveTask }) {
  function updateStatus() {
    item.status = item.status === "Active" ? "Completed" : "Active";
  }

  return (
    <div className="container task" key={item.index}>
      <label htmlFor={item.index} className="checkbox-label">
        <input
          id={item.index}
          type="checkbox"
          name="task-checkbox"
          className="checkbox"
          onClick={() => updateStatus()}
        />
        <div className="custom-checkbox"></div>
      </label>
      <p type="text" name="task-text">
        {item.task}
      </p>
      <img
        src={cross}
        alt="Cross Icon"
        className="cross"
        onClick={() => onRemoveTask(item.id)}
      />
    </div>
  );
}

function CountClear({ itemCount }) {
  return (
    <div className="container count-clear">
      <p className="item-count">{itemCount} Items Left</p>
      <button>Clear Completed</button>
    </div>
  );
}

function Filter({ onFilterItems }) {
  return (
    <div className="container filter">
      <button onClick={() => onFilterItems()}>All</button>
      <button onClick={() => onFilterItems("Active")}>Active</button>
      <button onClick={() => onFilterItems("Completed")}>Completed</button>
    </div>
  );
}
