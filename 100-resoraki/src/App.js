import React from "react";
import ReactDOM from "react-dom";
import Scene from "./Scene";

function App() {
  return (
    <div>
      <h1>Witaj w mojej aplikacji React z Three.js!</h1>
      <Scene />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export default App;
