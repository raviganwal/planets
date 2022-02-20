// import logo from './logo.svg';
import './App.css';
import ThreeCube from "./ThreeCube";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <h1>Three.js-React Integration</h1>
     <ThreeCube />
    </div>
  );
}

export default App;
