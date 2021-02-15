import { useState, useEffect, useRef } from "react";
import Forest from "./Forest";
import { Canvas } from "react-three-fiber";
import { BsPlus } from "react-icons/bs";
import { Range, getTrackBackground } from "react-range";
import HomePage from "./components/HomePage";
import Particles from "./components/models/Particles";
import MainEffects from "./components/effects/MainEffects";
import NavBar from "./components/NavBar";
import * as THREE from "three";

function App() {
  const [started, setStarted] = useState(false);
  const [song, setSong] = useState(null);
  const updateSong = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSong(URL.createObjectURL(file));
    }
  };
  const ref = useRef();
  const [mushrooms, setMushrooms] = useState([40]);

  const demo = () => {
    setSong("/music/bloom.flac");
    setStarted(true);
  };

  return (
    <>
      {!started && (
        <>
          <NavBar />
          <Canvas
            camera={{ fov: 100, position: [100, 0, 100] }}
            onCreated={({ gl }) => {
              gl.gammaInput = true;
              gl.setClearColor(new THREE.Color("#010105"));
            }}
          >
            <Particles
              count={1000}
              position={[0, 0, 0]}
              color={"white"}
              ref={ref}
              home={true}
            />
            <MainEffects />
            <ambientLight intensity={0.4} />
            <HomePage />
          </Canvas>
        </>
      )}
      {!started && (
        <div className="main-container">
          <label htmlFor={"song-input"} className="song-upload">
            <i className="las la-plus-square image-upload-plus"></i>
          </label>
          <input id={"song-input"} type="file" onChange={updateSong}></input>
          <button onClick={() => setStarted(true)}>Start</button>
          <button onClick={() => demo()}>Demo</button>

          <div>
            Once started, click directly on the crosshair to center your mouse
          </div>
          
        </div>
      )}
      {started && song && (
        <>
          <Forest song={song} />
          <div className="crosshair" style={{ pointerEvents: "none" }}>
            <BsPlus />
          </div>
        </>
      )}
    </>
  );
}

export default App;
