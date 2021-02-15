import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { Physics } from "use-cannon";
import ForestFloor from "./components/world/ForestFloor";
import Wanderer from "./components/world/Wanderer";
import AudioStarter from "./components/audio/AudioStarter.js";
import MainEffects from "./components/effects/MainEffects";
import { useRef, useEffect, useState } from "react";
import { GiMushroomGills } from "react-icons/gi";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import NavBar from "./components/NavBar";

const positions1 = [];

const set = new Set();

for (let x = 0; x < 30; x++) {
  let coords = [
    Math.floor(Math.random() * 400),
    -2,
    Math.floor(Math.random() * 400),
  ];

  if (!set.has(coords)) {
    positions1.push(coords);
    set.add(coords);
  }
}

function Forest({ song }) {
  const [volume, setVolume] = useState(0.1);
  const pointerRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (pointerRef.current) {
        console.log(pointerRef.current);
        pointerRef.current.addEventListener("lock", function () {
          document.getElementById("pause-menu").style.display = "none";
        });

        pointerRef.current.addEventListener("unlock", function () {
          document.getElementById("pause-menu").style.display = "block";
        });
      }
    }, 500);
  }, []);

  return (
    <>
      <div id="pause-menu">
        <NavBar />
        <div className="resume-instruct">
          <span>CLICK TO RESUME</span>
          <div className="circle-crosshair"></div>
        </div>
      </div>
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

        <AudioStarter
          volume={volume}
          setVolume={(volume) => setVolume(volume)}
          song={song}
          positions1={positions1}
        />
        <Physics gravity={[0, -30, 0]}>
          <ForestFloor />
          <Wanderer />
        </Physics>
        {/* <OrbitControls /> */}
        <PointerLockControls domElement={document.body} ref={pointerRef} />
      </Canvas>
    </>
  );
}

export default Forest;
