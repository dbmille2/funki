import { useRef, Suspense } from "react";
import { PositionalAudio } from "@react-three/drei";
import Mushroom from "../models/Mushroom";
const randomColor = require("randomcolor");

const AudioStarter = ({ song, positions1 }) => {
  const sound = useRef();

  return (
    <Suspense fallback={null}>
      <PositionalAudio
        url={song}
        ref={sound}
        distance={10000}
        position={[250, 0, 0]}
      />
      {positions1.map((position) => {
        let scale = Math.floor(Math.random() * 9) + 3;
        let scaleX = (Math.random() * 1 + 0.5) * scale;
        let scaleY = (Math.random() * 1 + 0.5) * scale;
        const yRotate = Math.random() * Math.PI;
        const mushroomType = Math.floor(Math.random() * 100) < 88 ? 1 : 2;
        return (
          <Mushroom
            sound={sound}
            scale={[scaleX, scaleY, scaleX]}
            color={randomColor()}
            position={position}
            yRotate={yRotate}
            mushroomType={mushroomType}
          />
        );
      })}
    </Suspense>
  );
};

export default AudioStarter;
