import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";

function ThreeDObject() {
  const boxRef = useRef();

  const handleKeyDown = (event) => {
    const speed = 0.1;
    const box = boxRef.current;

    switch (event.key) {
      case "w":
        box.position.z -= speed;
        break;
      case "a":
        box.position.x -= speed;
        break;
      case "s":
        box.position.z += speed;
        break;
      case "d":
        box.position.x += speed;
        break;
      default:
        break;
    }
  };

  return (
    <Canvas onKeyDown={handleKeyDown} style={{ outline: "none" }} tabIndex={0}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box ref={boxRef}>
        <meshStandardMaterial
          attach="material"
          color="#FFFFFF"
          roughness={0.5}
          metalness={0.5}
          gradientMap={[0x000000, 0xffffff]} // Dodajemy gradientMap, aby uzyskać gradient
        />
      </Box>
    </Canvas>
  );
}

export default ThreeDObject;
