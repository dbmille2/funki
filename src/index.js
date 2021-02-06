import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BsPlus } from "react-icons/bs";

function Overlay() {
  const [ready, set] = useState(false);
  return (
    <>
      <App />
      {!ready && <div className="overlay"></div>}
      <div
        className="crosshair"
        style={{ pointerEvents: ready ? "none" : "all" }}
        onClick={() => set(true)}
      >
        <BsPlus />
      </div>
    </>
  );
}

ReactDOM.render(<Overlay />, document.getElementById("root"));
