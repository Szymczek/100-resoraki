import React from "react";
import ReactDOM from "react-dom";
import Scene from "./Scene";
import { Box } from "@react-three/drei";
function App() {
  return (
    <div>
      <h1>Witaj w mojej aplikacji React z Three.js!</h1>
      <Scene />
      <Box />
      <p>End</p>
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
