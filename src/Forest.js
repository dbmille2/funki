import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { Physics } from "use-cannon";
import ForestFloor from "./components/world/ForestFloor";
import Wanderer from "./components/world/Wanderer";
import AudioStarter from "./components/audio/AudioStarter.js";
import MainEffects from "./components/effects/MainEffects";
import { useRef, useEffect, useState } from "react";
import NavBar from "./components/NavBar";

function Forest({ song, positions1, speed }) {
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
          <Wanderer speed={speed} />
        </Physics>
        
        {/* <OrbitControls /> for future use*/}
        <PointerLockControls domElement={document.body} ref={pointerRef} />
      </Canvas>
    </>
  );
}

export default Forest;
