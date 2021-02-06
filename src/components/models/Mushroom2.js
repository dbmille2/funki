import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
const randomColor = require("randomcolor");

const Mushroom2 = ({ model, scale, color, position, yRotate, data }) => {
  const [newColor, setNewColor] = useState();
  const [newColor2, setNewColor2] = useState();
  const { lowerAvgFr, lower2AvgFr, upperAvgFr } = data;
  const [opacity, setOpacity] = useState(lowerAvgFr / 40);
  const [rotation, setRotation] = useState(lowerAvgFr / 30);

  useFrame(() => {
    setOpacity(lower2AvgFr / 40);
    setRotation(lowerAvgFr / 30);
    // setNewColor(randosmColor());
  });

  return (
    <group
      scale={[10, 10, 10]}
      position={position}
      onClick={() => {
        setNewColor(randomColor());
        // setNewColor2(randomColor());
      }}
      rotation={[0, 0, 0]} //yRotate
    >
      <primitive object={model.scene} />
      <mesh
        scale={[1.1, 1.1, 1.1]}
        position={[0, 7.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusBufferGeometry attach="geometry" args={[2.4, 0.2, 50, 100]} />
        <meshBasicMaterial attach="material" color={newColor} />
      </mesh>
      <mesh
        scale={[1.1, 1.1, 1.1]}
        position={[0, 7.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusBufferGeometry attach="geometry" args={[1.2, 0.2, 50, 100]} />
        <meshBasicMaterial attach="material" color={newColor} />
      </mesh>
      <mesh position={[0, -2, 0]} rotation={[0, rotation, 0]}>
        <cylinderBufferGeometry
          attach="geometry"
          args={[2.7, rotation * 8, 20, 8]}
        />
        <meshBasicMaterial
          transparent
          wireframe={true}
          attach="material"
          color={newColor}
        />
      </mesh>
      <mesh position={[0, -2, 0]} rotation={[0, -1 * rotation, 0]}>
        <cylinderBufferGeometry
          attach="geometry"
          args={[1.4, rotation * 4, 20, 8]}
        />
        <meshBasicMaterial
          transparent
          wireframe={true}
          attach="material"
          color={newColor}
        />
      </mesh>
    </group>
  );
};

export default Mushroom2;
