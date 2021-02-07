import * as THREE from "three";
import React from "react";
import { useLoader } from "react-three-fiber";
import { usePlane } from "use-cannon";
import grass from "../../images/grass.jpeg";

const ForestFloor = (props) => {
  const [ref] = usePlane(() => ({
    position: [250, 0, 250],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  const texture = useLoader(THREE.TextureLoader, grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(500, 500);
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[500, 500]} />
      <meshStandardMaterial map={texture} color="green" />
    </mesh>
  );
};

export default ForestFloor;
