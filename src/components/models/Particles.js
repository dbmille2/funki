import * as THREE from "three";
import React, { useMemo, useState } from "react";
import { useFrame } from "react-three-fiber";

const Particles = React.forwardRef(
  ({ count, position, color }, ref) => {
    const mesh = ref;
    const [fqyFactor, setFqyFactor] = useState(0.2);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
      const temp = [];
      for (let i = 0; i < count; i++) {
        const t = Math.random() * 100;
        const factor = 20 + Math.random() * 100;
        const speed = 0.01 + Math.random() / 500;
        const xFactor = -50 + Math.random() * 200;
        const yFactor = -50 + Math.random() * 200;
        const zFactor = -50 + Math.random() * 200;
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
      setFqyFactor(ref.current.data);
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
        t = particle.t += speed / 10;
        const a = Math.cos(t) + Math.sin(t * 1) / 10;
        const b = Math.sin(t) + Math.cos(t * 2) / 10;
        const s = Math.cos(t);
        dummy.position.set(
          (particle.mx / 10) * a +
            xFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b +
            yFactor +
            Math.sin((t / 10) * factor) +
            (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b +
            zFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 3) * factor) / 10
        );
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(s * 5, s * 5, s * 5);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    });
    return (
      <group scale={[4, 4, 4]} color="never" position={position}>
        <instancedMesh ref={mesh} args={[null, null, count]}>
          <dodecahedronBufferGeometry args={[fqyFactor * 3 + 0.01, 0]} />
          <meshBasicMaterial attach="material" color={color} />
        </instancedMesh>
      </group>
    );
  }
);

export default Particles;
