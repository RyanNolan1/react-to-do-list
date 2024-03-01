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
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
    </header>
  );
}

function AddTask() {
  return (
  <div className="add-task-container">
      <input id="add-task-radio" type="radio" name="add-task-radio"></input>
      <input id="add-task-text" type="text" name="add-task-text" placeholder="Create a new todo…"></input>
  </div>
  )
}

function Task() {
  return (
    <div className="task-container">
      <input id="task-radio" type="radio" name="task-radio"></input>
      <input id="task-text" type="text" name="ask-text" placeholder="Create a new todo…"></input>
    </div>
  )
}
