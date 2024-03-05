import { Canvas } from "@react-three/fiber";
import "./App.css";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry args={[0.5, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

function Sphere() {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 30, 30]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <div className="App">
        <Canvas>
          {
            <>
              <Box />
              <Box />
            </>
          }
        </Canvas>
      </div>
    </div>
  );
}

export default App;
