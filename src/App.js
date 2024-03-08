import moonIcon from "./images/icon-moon.svg";
import sunIcon from "./images/icon-sun.svg";
import cross from "./images/icon-cross.svg";
import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeButton, setActiveButton] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

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

  function removeCompletedTasks() {
    const filteredArray = items.filter((item) => item.status !== "Complete");
    setItems(filteredArray);
    setFilteredItems(filteredArray);
  }

  return (
    <div className="app">
      <Header onDarkMode={handleDarkMode} darkMode={isDarkMode} />
      <div className="tasks-container">
        <AddTask darkMode={isDarkMode} onAddItems={handleAddItems} />
        <ToDoList
          darkMode={isDarkMode}
          handleRemoveTask={handleRemoveTask}
          items={filteredItems}
        />
        <CountClear
          darkMode={isDarkMode}
          onRemoveCompletedTasks={removeCompletedTasks}
          itemCount={items.length}
          handleButtonClick={handleButtonClick}
        />
        <Filter
          darkMode={isDarkMode}
          handleButtonClick={handleButtonClick}
          activeButton={activeButton}
          onFilterItems={handleFilter}
        />
      </div>
    </div>
  );
}

function Header({ onDarkMode, darkMode }) {
  return (
    <header className={darkMode === false ? "bg-light" : "bg-dark"}>
      <div className="container title-toggle">
        <h1>T O D O</h1>
        <button
          onClick={() => {
            onDarkMode();
          }}
        >
          <img src={darkMode === false ? moonIcon : sunIcon} alt="Moon Icon" />
        </button>
      </div>
    </header>
  );
}

function ToDoList({ items, handleRemoveTask, darkMode }) {
  return (
    <div>
      {items.map((item, index) => (
        <Task
          onRemoveTask={handleRemoveTask}
          item={item}
          task={item.task}
          id={index}
          key={item.id}
          darkMode={darkMode}
        ></Task>
      ))}
    </div>
  );
}

function AddTask({ onAddItems, darkMode }) {
  const [task, setTask] = useState("");
  const [id, setId] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (task) {
      const newItem = { id: id, task, status: "Active", checked: false };
      onAddItems(newItem);
      setTask("");
      setId(id + 1);
    }
  }

  return (
    <form className={darkMode === true ? "container add-task dark-task" :  "container add-task"}  onSubmit={handleSubmit}>
      <label htmlFor="add-task-checkbox">
        <input
          id="add-task-checkbox"
          type="checkbox"
          name="add-task-checkbox"
          className="checkbox"
        />
        <div className="add-custom-checkbox"></div>
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

function Task({ item, onRemoveTask, darkMode }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <div
      className={
        darkMode === true ? "container task dark-task" : "container task"
      }
      key={item.index}
    >
      <label htmlFor={item.index} className="checkbox-label">
        <input
          id={item.index}
          type="checkbox"
          name="task-checkbox"
          className="checkbox"
          checked={item.checked = isChecked}
          status={item.status = item.checked === false ? "Active" : "Complete"}
          onChange={() => handleCheck()}
        />
        <div className="custom-checkbox">
          <div className="tick-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
        </div>
      </label>
      <p
        type="text"
        name="task-text"
        className={isChecked ? "checked-text" : "unchecked-text"}
      >
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

function CountClear({ itemCount, onRemoveCompletedTasks, handleButtonClick, darkMode }) {
  return (

    <div className={darkMode === true ? "container count-clear dark-task" : "container count-clear"}>
      <p className="item-count">{itemCount} Items Left </p>
      <button
        onClick={() => {
          onRemoveCompletedTasks();
          handleButtonClick(1);
        }}
      >
        Clear Completed
      </button>
    </div>
  );
}

function Filter({ onFilterItems, handleButtonClick, activeButton, darkMode }) {
  return (
    <div className={darkMode === true ? "container filter dark-task" : "container filter"} >
      <button
        onClick={() => {
          onFilterItems();
          handleButtonClick(1);
        }}
        className={
          activeButton === 1 ? "filter-buttons active" : "filter-buttons"
        }
      >
        All
      </button>
      <button
        onClick={() => {
          onFilterItems("Active");
          handleButtonClick(2);
        }}
        className={
          activeButton === 2 ? "filter-buttons active" : "filter-buttons"
        }
      >
        Active
      </button>
      <button
        onClick={() => {
          onFilterItems("Complete");
          handleButtonClick(3);
        }}
        className={
          activeButton === 3 ? "filter-buttons active" : "filter-buttons"
        }
      >
        Completed
      </button>
    </div>
  );
}
