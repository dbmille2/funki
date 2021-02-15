import { useRef, Suspense, useState, useEffect } from "react";
import { PositionalAudio } from "@react-three/drei";
import Mushroom from "../models/Mushroom";
import { useFrame } from "react-three-fiber";
const randomColor = require("randomcolor");

const AudioStarter = ({ volume, song, positions1 }) => {
  const sound = useRef();

  const pauseMenu = (e) => {
    // console.log(sound.current.isPlaying);
    if (e.key === " " && sound.current.isPlaying) {
      sound.current.pause();
      return;
    } else if (e.key === " " && !sound.current.isPlaying) {
      sound.current.play();
      return;
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => pauseMenu(e));
  });

  useEffect(() => {
    if (sound.current) {
      sound.current.listener.setMasterVolume(0.2);
    }
  }, [sound.current]);

  return (
    <>
      <Suspense fallback={null}>
        <PositionalAudio
          url={song}
          ref={sound}
          distance={10000}
          position={[200, 0, 0]}
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
              color={randomColor({ luminosity: "light" })}
              position={position}
              yRotate={yRotate}
              mushroomType={mushroomType}
            />
          );
        })}
      </Suspense>
    </>
  );
};

export default AudioStarter;
