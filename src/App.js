import moonIcon from "./images/icon-moon.svg";
import sunIcon from "./images/icon-sun.svg";
import cross from "./images/icon-cross.svg";
import check from "./images/icon-check.svg";
import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeButton, setActiveButton] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  function handleDarkText(checkedOrNot) {
    if (isDarkMode === true && checkedOrNot === "checked-text") {
      return (checkedOrNot = "dark-checked-text");
    }

    if (isDarkMode === false && checkedOrNot === "checked-text") {
      return (checkedOrNot = "checked-text");
    }
  }

  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);

    if (isDarkMode) {
      document.body.style.background = "hsl(0, 0%, 98%)";
    } else {
      document.body.style.background = "#171823";
    }
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
      <div
        className={
          isDarkMode === true ? "dark-tasks-container" : "tasks-container"
        }
      >
        <AddTask darkMode={isDarkMode} onAddItems={handleAddItems} />
        <ToDoList
          onHandleDarkText={handleDarkText}
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

function ToDoList({ onHandleDarkText, items, handleRemoveTask, darkMode }) {
  return (
    <div className="tasks-list">
      {items.map((item, index) => (
        <Task
          onRemoveTask={handleRemoveTask}
          item={item}
          task={item.task}
          id={index}
          key={item.id}
          darkMode={darkMode}
          onHandleDarkText={onHandleDarkText}
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
    <form
      className={
        darkMode === true ? "container add-task dark" : "container add-task"
      }
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-task-checkbox">
        <input
          id="add-task-checkbox"
          type="checkbox"
          name="add-task-checkbox"
          className="checkbox"
        />
        <div
          className={
            darkMode === true
              ? "add-custom-checkbox dark-checkbox"
              : "add-custom-checkbox"
          }
        ></div>
      </label>
      <input
        className={
          darkMode === true ? "add-task-input dark-input" : "add-task-input"
        }
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

function Task({ item, onRemoveTask, darkMode, onHandleDarkText }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    item.checked = isChecked ? false : true;
    item.status = isChecked ? "Active" : "Complete";
    item.text = isChecked ? "unchecked-text" : "checked-text";
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
          checked={item.checked}
          status={item.status}
          onChange={() => handleCheck()}
        />
        <div
          className={
            darkMode === true
              ? "custom-checkbox dark-checkbox"
              : "custom-checkbox"
          }
        >
          <div
            className={
              darkMode === true ? "tick-container dark-tick" : "tick-container"
            }
          >
            {item.checked === true && <img src={check} alt="tick" />}
          </div>
        </div>
      </label>
      <p type="text" name="task-text" className={onHandleDarkText(item.text)}>
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

function CountClear({
  itemCount,
  onRemoveCompletedTasks,
  handleButtonClick,
  darkMode,
}) {
  return (
    <div
      className={
        darkMode === true
          ? "container count-clear dark"
          : "container count-clear"
      }
    >
      <p className="item-count">{itemCount} Items Left </p>
      <button
        className={darkMode === true ? "darkmode-button-hover" : undefined}
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
    <div
      className={
        darkMode === true ? "container filter dark" : "container filter"
      }
    >
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
