import * as THREE from "three";
import React, { useMemo, useState } from "react";
import { useFrame } from "react-three-fiber";

const Balls = React.forwardRef(({ count, position }, ref) => {
  const mesh = ref.outerRef;
  const mesh2 = ref.middleRef;
  const mesh3 = ref.innerRef;
  const [outer, setOuter] = useState(1);
  const [middle, setMiddle] = useState(1);
  const [inner, setInner] = useState(1);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const balls = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 500;
      const xFactor = Math.random() * 400;
      const yFactor = Math.random() * 25;
      const zFactor = Math.random() * 400;
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);
  useFrame(() => {
    balls.forEach((ball, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = ball;
      t = ball.t += speed / 10;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (ball.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (ball.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (ball.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        setOuter(mesh.current.data / 8 + 0.5);
        mesh.current.setMatrixAt(i, dummy.matrix);
        mesh.current.instanceMatrix.needsUpdate = true;
      }
      if (mesh2.current) {
        setMiddle(mesh2.current.data / 3 + 0.5);
        mesh2.current.setMatrixAt(i, dummy.matrix);
        mesh2.current.instanceMatrix.needsUpdate = true;
      }
      if (mesh3.current) {
        setInner(mesh3.current.data * 10 + 0.5);
        mesh3.current.setMatrixAt(i, dummy.matrix);
        mesh3.current.instanceMatrix.needsUpdate = true;
      }
    });
  });
  return (
    <group scale={[1, 1, 1]} color="never" position={position}>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereBufferGeometry args={[outer, 12, 8]} />
        <meshStandardMaterial wireframe attach="material" color={"hotpink"} />
      </instancedMesh>
      <instancedMesh ref={mesh2} args={[null, null, count]}>
        <sphereBufferGeometry attach="geometry" args={[middle, 12, 10]} />
        <meshStandardMaterial wireframe attach="material" color={"lightblue"} />
      </instancedMesh>
      <instancedMesh ref={mesh3} args={[null, null, count]}>
        <sphereBufferGeometry attach="geometry" args={[inner, 12, 12]} />
        <meshStandardMaterial
          wireframe
          attach="material"
          color={"lightgreen"}
        />
      </instancedMesh>
    </group>
  );
});

export default Balls;
