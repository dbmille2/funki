import { useState, useEffect } from "react";
import Forest from "./Forest";
import { BsPlus } from "react-icons/bs";
import { Range, getTrackBackground } from "react-range";

function App() {
  const [started, setStarted] = useState(false);
  const [song, setSong] = useState(null);
  const updateSong = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSong(URL.createObjectURL(file));
    }
  };
  const [mushrooms, setMushrooms] = useState([40]);

  const demo = () => {
    setSong("/music/bloom.flac");
    setStarted(true);
  };
  useEffect(() => {
    console.log(mushrooms);
  }, [mushrooms]);

  return (
    <>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              margin: "2em",
              width: "500px",
            }}
          >
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
                    width: "100%",
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
                        colors: ["#7f1aab", "#ccc"],
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
                    height: "42px",
                    width: "42px",
                    borderRadius: "4px",
                    backgroundColor: "#FFF",
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
                      backgroundColor: isDragged ? "#7f1aab" : "#CCC",
                    }}
                  />
                </div>
              )}
            />
            <output style={{ marginTop: "30px" }} id="output">
              {mushrooms[0].toFixed()}
            </output>
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
