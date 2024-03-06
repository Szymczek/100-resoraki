import React from "react";
import ThreeDObject from "./ThreeDObject";
import ReactDOM from "react-dom";
// import ReactDOM from "@react-three/drei";
function App() {
  return (
    <div>
      <h1>Witaj w mojej aplikacji React z Three.js!</h1>
      <ThreeDObject />
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
