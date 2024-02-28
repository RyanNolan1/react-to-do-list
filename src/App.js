import moonIcon from './images/icon-moon.svg'


export default function App() {
  return (
    <div className="app">
      <Header />
    </div>
  );
}

function Header() {
  return <header>
    <div className="title-toggle-container">
      <h1>T O D O</h1>
      <img src={moonIcon} alt="Moon Icon" />
    </div>
  </header>
}
