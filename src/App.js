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
import { BiSlider } from "react-icons/bi";
import { GiMushrooms } from "react-icons/gi";
import { IoGridSharp } from "react-icons/io5";
import { RiWalkFill } from "react-icons/ri";
import * as THREE from "three";

function App() {
  const [started, setStarted] = useState(false);
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
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
  const [area, setArea] = useState([250]);
  const [speed, setSpeed] = useState([15]);

  const demo = () => {
    setSong("/music/bloom.flac");
    setTitle("Bloom");
    setArtist("ODESZA");
    setTimeout(() => {
      setStarted(true);
    }, 2000);
  };

  const [positions, setPositions] = useState([]);
  useEffect(() => {
    const set = new Set();
    const temp = [];
    for (let x = 0; x < mushrooms[0]; x++) {
      let coords = [
        Math.floor(Math.random() * 400),
        -2,
        Math.floor(Math.random() * 400),
      ];

      if (!set.has(coords)) {
        temp.push(coords);
        set.add(coords);
      }
    }
    setPositions(temp);
  }, [mushrooms]);

  useEffect(() => {
    console.log(speed[0]);
  }, [speed]);

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
            <div
              className={
                !settingsOpen ? "song-selection" : "song-selection open"
              }
            >
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

              <BiSlider
                className="sliders-button"
                onClick={() => setSettingsOpen(!settingsOpen)}
              />
              <div className="sliders">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "400px",
                    marginBottom: "12px",
                  }}
                >
                  <GiMushrooms className="mush-label" />
                  <Range
                    values={mushrooms}
                    step={1}
                    min={5}
                    max={50}
                    onChange={(value) => setMushrooms(value)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "85%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: mushrooms,
                              colors: ["#FFF", "#404040"],
                              min: 5,
                              max: 50,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "21px",
                          width: "21px",
                          borderRadius: "4px",
                          backgroundColor: "#DDD",
                          display: "flex",
                          outline: "none",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                        }}
                      >
                        <div
                          style={{
                            height: "16px",
                            width: "5px",
                            backgroundColor: !isDragged ? "#404040" : "#BBB",
                          }}
                        />
                      </div>
                    )}
                  />
                  <output id="mush-output">{mushrooms[0].toFixed()}</output>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "400px",
                    marginBottom: "12px",
                  }}
                >
                  <IoGridSharp className="mush-label" />
                  <Range
                    values={area}
                    step={25}
                    min={100}
                    max={500}
                    onChange={(value) => setArea(value)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "85%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: area,
                              colors: ["#FFF", "#404040"],
                              min: 100,
                              max: 500,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "21px",
                          width: "21px",
                          borderRadius: "4px",
                          backgroundColor: "#DDD",
                          display: "flex",
                          outline: "none",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                        }}
                      >
                        <div
                          style={{
                            height: "16px",
                            width: "5px",
                            backgroundColor: !isDragged ? "#404040" : "#BBB",
                          }}
                        />
                      </div>
                    )}
                  />
                  <output id="area-output">{area[0].toFixed()}</output>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "400px",
                    marginBottom: "12px",
                  }}
                >
                  <RiWalkFill className="mush-label" />
                  <Range
                    values={speed}
                    step={1}
                    min={5}
                    max={50}
                    onChange={(value) => setSpeed(value)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "85%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: speed,
                              colors: ["#FFF", "#404040"],
                              min: 5,
                              max: 50,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "21px",
                          width: "21px",
                          borderRadius: "4px",
                          backgroundColor: "#DDD",
                          display: "flex",
                          outline: "none",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                        }}
                      >
                        <div
                          style={{
                            height: "16px",
                            width: "5px",
                            backgroundColor: !isDragged ? "#404040" : "#BBB",
                          }}
                        />
                      </div>
                    )}
                  />
                  <output id="speed-output">{speed[0].toFixed()}</output>
                </div>
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
          <Forest positions1={positions} speed={speed[0]} song={song} />
          <div className="crosshair" style={{ pointerEvents: "none" }}>
            <BsPlus />
          </div>
        </>
      )}
    </>
  );
}

export default App;
