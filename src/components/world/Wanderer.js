import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useSphere } from "use-cannon";
import { useThree, useFrame } from "react-three-fiber";

const keys = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
};
const moveFieldByKey = (key) => keys[key];
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

const useWandererControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  useEffect(() => {
    const handleKeyDown = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};

const Wanderer = ({ speed }) => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [200, 0, 434],
  }));
  const { forward, backward, left, right } = useWandererControls();
  const { camera } = useThree();
  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [
    api.velocity,
  ]);
  useFrame(() => {
    camera.position.copy(ref.current.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });
  return <mesh ref={ref} />;
};

export default Wanderer;
