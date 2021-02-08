import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { Physics } from "use-cannon";
import ForestFloor from "./components/world/ForestFloor";
import Wanderer from "./components/world/Wanderer";
import AudioStarter from "./components/audio/AudioStarter.js";
import MainEffects from "./components/effects/MainEffects";
import { useThree, useFrame } from "react-three-fiber";
import { useRef } from "react";

const positions1 = [];

const set = new Set();

for (let x = 0; x < 40; x++) {
  let coords = [
    Math.floor(Math.random() * 500),
    -2,
    Math.floor(Math.random() * 500),
  ];

  if (!set.has(coords)) {
    positions1.push(coords);
    set.add(coords);
  }
}

function Forest({ song }) {
  return (
    <Canvas
      concurrent
      camera={{ fov: 35 }} //{fov: 35} //{ position: [10, 10, 10] }
      onCreated={({ gl }) => {
        gl.gammaInput = true;
        gl.setClearColor(new THREE.Color("#010105"));
      }}
    >
      <ambientLight intensity={0.4} />
      <MainEffects />

      <AudioStarter song={song} positions1={positions1} />
      <Physics gravity={[0, -30, 0]}>
        <ForestFloor />
        <Wanderer />
      </Physics>
      {/* <OrbitControls /> */}
      <PointerLockControls />
    </Canvas>
  );
}

export default Forest;
