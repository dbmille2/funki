import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "react-three-fiber";

const HomePage = () => {
  const lightRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame(() => {
    lightRef.current.position.set(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        distance={10}
        intensity={8}
        color="white"
      ></pointLight>
    </>
  );
};

export default HomePage;
