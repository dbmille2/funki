import { useState } from "react";
import Forest from "./Forest";
import { BsPlus } from "react-icons/bs";

function App() {
  const [started, setStarted] = useState(false);
  const [song, setSong] = useState(null);
  const updateSong = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSong(URL.createObjectURL(file));
    }
  };

  const demo = () => {
    setSong("/music/bloom.flac");
    setStarted(true);
  };
  return (
    <>
      {!started && (
        <div className="image-placeholder">
          <label htmlFor={"image-input"} className="image-upload">
            <i className="las la-plus-square image-upload-plus"></i>
          </label>
          <input id={"image-input"} type="file" onChange={updateSong}></input>
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
