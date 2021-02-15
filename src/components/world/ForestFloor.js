import * as THREE from "three";
import React from "react";
import { useLoader } from "react-three-fiber";
import { usePlane } from "use-cannon";
import grass from "../../images/grass.jpeg";

const ForestFloor = (props) => {
  const [ref] = usePlane(() => ({
    position: [200, 0, 200],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  const texture = useLoader(THREE.TextureLoader, grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(200, 200);
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[500, 500]} />
      <meshStandardMaterial map={texture} color="green" />
    </mesh>
  );
};

export default ForestFloor;
