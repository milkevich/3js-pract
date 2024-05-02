import React, { useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "@react-three/drei";

function Model() {
  const gltf = useLoader(GLTFLoader, 'https://drive.google.com/uc?export=download&id=1dZ1BC5HrxmLFtqhNlTyn3q9nIsM9Vhsc');
  const modelRef = useRef();

  return <primitive ref={modelRef} object={gltf.scene} />;
}

function App() {
  const [position, setPosition] = useState([0, 0, 0]);

  const handleKeyDown = (event) => {
    const step = 0.1;
    const newPosition = [...position];
    switch (event.key) {
      case "ArrowUp":
        newPosition[2] -= step;
        break;
      case "ArrowDown":
        newPosition[2] += step;
        break;
      case "ArrowLeft":
        newPosition[0] -= step;
        break;
      case "ArrowRight":
        newPosition[0] += step;
        break;
      default:
        return;
    }
    setPosition(newPosition);
  };

  return (
    <Canvas onKeyDown={handleKeyDown} tabIndex={0}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <mesh position={position}>
        <Model />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
