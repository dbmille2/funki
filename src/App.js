import { useState, useEffect, useRef } from "react";
import Forest from "./Forest";
import { Canvas } from "react-three-fiber";
import { BsPlus } from "react-icons/bs";
import { Range, getTrackBackground } from "react-range";
import HomePage from "./components/HomePage";
import Particles from "./components/models/Particles";
import MainEffects from "./components/effects/MainEffects";
import NavBar from "./components/NavBar";
import { BsPlusSquare } from "react-icons/bs";
import * as THREE from "three";

function App() {
  const [started, setStarted] = useState(false);
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const updateSong = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSong(URL.createObjectURL(file));
      let filename = file.name;
      const splitName = filename.split(" - ");
      console.log(splitName);
      const splitTitle = splitName[1].split(".");
      setArtist(splitName[0]);
      setTitle(splitTitle.slice(0, splitTitle.length - 1));
    }
  };
  const ref = useRef();
  const [mushrooms, setMushrooms] = useState([40]);

  const demo = () => {
    setSong("/music/bloom.flac");
    setTitle("Bloom");
    setArtist("ODESZA");
    setTimeout(() => {
      setStarted(true);
    }, 2000);
  };

  return (
    <>
      {!started && (
        <>
          <NavBar />
          <Canvas
            camera={{ fov: 80, position: [50, 0, 50] }}
            onCreated={({ gl }) => {
              gl.gammaInput = true;
              gl.setClearColor(new THREE.Color("#010105"));
            }}
          >
            <Particles
              count={1500}
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
        <>
          <div className="main-container">
            <div className="song-selection">
              <label htmlFor={"song-input"} className="song-upload">
                <BsPlusSquare className="song-upload-plus" />
              </label>
              <input
                id={"song-input"}
                type="file"
                onChange={updateSong}
              ></input>
              <div
                className="start-button main-button"
                onClick={() => setStarted(true)}
              >
                start
              </div>
              <div className="demo-button main-button" onClick={() => demo()}>
                demo
              </div>

              <div className="select-a-song">select a song</div>
              <div className="song-info">
                <div className="song-title">{title}</div>
                <div className="song-artist">{artist}</div>
              </div>
            </div>
            <div className="instructions-container">
              <div className="instructions-header">instructions</div>
              <div className="instructions-subheader">
                once inside, click on crosshair to begin
              </div>
              <ul className="controls">
                <li>menu{"        |        "}esc</li>
                <li>pause music{"        |        "}space</li>
                <li>move{"        |        "}w a s d</li>
                <li>look{"        |        "}mouse</li>
              </ul>
            </div>
          </div>
        </>
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
