import React, { useState, useRef, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { average, max } from "../../helpers/math.js";
import Particles from "../models/Particles";
import Balls from "../models/Balls";
const randomColor = require("randomcolor");

const Mushroom = ({ sound, scale, color, position, yRotate, mushroomType }) => {
  const [newColor, setNewColor] = useState(color);
  const [model, setModel] = useState();
  const mesh = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const mesh4 = useRef();
  const mesh5 = useRef();
  const mesh6 = useRef();
  // const mesh7 = useRef();
  // const mesh8 = useRef();
  // const mesh9 = useRef();
  const outerRef = useRef();
  const middleRef = useRef();
  const innerRef = useRef();
  const particleRef = useRef();
  const particleRef2 = useRef();
  const particleRef3 = useRef();
  const [rotation, setRotation] = useState();
  const analyser = useRef();
  useEffect(
    () =>
      void (analyser.current = new THREE.AudioAnalyser(sound.current, 2048)),
    []
  );
  useFrame(() => {
    if (analyser.current && model) {
      const data = analyser.current.getFrequencyData();
      const lowers1 = data.slice(0, data.length / 64 - 1);
      const lowers2 = data.slice(data.length / 64 - 1, data.length / 16);
      const uppers = data.slice(data.length / 2, data.length - 1);
      const lowerMax = max(lowers1);
      const lowerAvg = average(lowers1);
      const lower2Avg = average(lowers2);
      const upperAvg = average(uppers);
      const lowerMaxFr = lowerMax / lowers1.length;
      const lowerAvgFr = lowerAvg / lowers1.length;
      const lower2AvgFr = lower2Avg / lowers2.length;
      const upperAvgFr = upperAvg / uppers.length;
      if (mushroomType === 1) {
        mesh.current.scale.x = mesh.current.scale.y = mesh.current.scale.z =
          lowerAvgFr / 18 + 0.3;
        mesh2.current.scale.x = mesh2.current.scale.y = mesh2.current.scale.z =
          lowerAvgFr / 18 + 0.3;
        mesh3.current.scale.x = mesh3.current.scale.y = mesh3.current.scale.z =
          lower2AvgFr / 4 + 0.4;
        mesh4.current.scale.x = mesh4.current.scale.y = mesh4.current.scale.z =
          lower2AvgFr / 4 + 0.4;
        particleRef.current.data = upperAvgFr;
        particleRef2.current.data = upperAvgFr;
        particleRef3.current.data = upperAvgFr;

        // mesh7.current.scale.x = mesh7.current.scale.y = mesh7.current.scale.z =
        //   lowerAvgFr / 12 + 1;
        // mesh8.current.scale.x = mesh8.current.scale.y = mesh8.current.scale.z =
        //   lower2AvgFr / 2 + 0.5;
        // mesh9.current.scale.x = mesh9.current.scale.y = mesh9.current.scale.z =
        //   upperAvgFr * 10 + 1.5;
        // mesh7.current.rotation.y = mesh7.current.rotation.y + 0.003;
        // mesh7.current.rotation.z = mesh7.current.rotation.z + 0.003;
        // mesh8.current.rotation.y = mesh8.current.rotation.y - 0.003;
        // mesh8.current.rotation.z = mesh8.current.rotation.z - 0.003;
        // mesh9.current.rotation.y = mesh9.current.rotation.y + 0.003;
        // mesh9.current.rotation.x = mesh9.current.rotation.x + 0.003;
      } else {
        setRotation(lowerAvgFr / 30);
        // console.log(lowerAvgFr / 30);
        particleRef.current.data = upperAvgFr;
        particleRef2.current.data = upperAvgFr;
        particleRef3.current.data = upperAvgFr;
        outerRef.current.data = lowerAvgFr;
        middleRef.current.data = lower2AvgFr;
        innerRef.current.data = upperAvgFr;

        mesh5.current.scale.x = mesh5.current.scale.y = mesh5.current.scale.z =
          lowerAvgFr / 20 + 0.4;
        mesh6.current.scale.x = mesh6.current.scale.y = mesh6.current.scale.z =
          lowerAvgFr / 20 + 0.4;
        // mesh7.current.scale.x = mesh7.current.scale.y = mesh7.current.scale.z =
        //   lowerAvgFr / 8 + 1;
        // mesh8.current.scale.x = mesh8.current.scale.y = mesh8.current.scale.z =
        //   lower2AvgFr / 1.5;
        // mesh9.current.scale.x = mesh9.current.scale.y = mesh9.current.scale.z =
        //   upperAvgFr * 10 + 1.5;
        // mesh7.current.rotation.y = mesh7.current.rotation.y + 0.003;
        // mesh7.current.rotation.z = mesh7.current.rotation.z + 0.003;
        // mesh8.current.rotation.y = mesh8.current.rotation.y - 0.003;
        // mesh8.current.rotation.z = mesh8.current.rotation.z - 0.003;
        // mesh9.current.rotation.y = mesh9.current.rotation.y + 0.003;
        // mesh9.current.rotation.x = mesh9.current.rotation.x + 0.003;
      }
    }
  });
  useEffect(() => {
    new GLTFLoader().load("/mushroom/scene.gltf", setModel);
  }, []);

  if (mushroomType === 1) {
    return model ? (
      <>
        <group
          scale={scale}
          position={position}
          onClick={() => setNewColor(randomColor())}
          rotation={[0, yRotate, 0]}
        >
          <primitive object={model.scene} />
          <>
            <mesh
              ref={mesh}
              position={[0, 7.75, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <torusBufferGeometry
                attach="geometry"
                args={[2.4, 0.2, 50, 100]}
              />
              <meshBasicMaterial attach="material" color={newColor} />
            </mesh>
            <mesh
              ref={mesh2}
              position={[0, 7.8, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <torusBufferGeometry
                attach="geometry"
                args={[2.4 / 2, 0.2, 50, 100]}
              />
              <meshBasicMaterial attach="material" color={newColor} />
            </mesh>
            <mesh
              ref={mesh3}
              position={[0.34, 2.5, 0.172]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <torusBufferGeometry
                attach="geometry"
                args={[2.4 / 9, 0.2, 50, 100]}
              />
              <meshBasicMaterial attach="material" color={newColor} />
            </mesh>
            <mesh
              ref={mesh4}
              position={[0.275, 5.5, 0.3]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <torusBufferGeometry
                attach="geometry"
                args={[2.4 / 11, 0.2, 50, 100]}
              />
              <meshBasicMaterial attach="material" color={newColor} />
            </mesh>
          </>
          <pointLight
            distance={5}
            position={[0, 10, 0]}
            intensity={4}
            color={newColor}
          />
        </group>
        <Particles
          ref={particleRef}
          color={"lightblue"}
          count={25}
          position={[-55, 140, -55]}
        />
        <Particles
          ref={particleRef2}
          color={"hotpink"}
          count={25}
          position={[-50, 140, -50]}
        />
        <Particles
          ref={particleRef3}
          color={"yellow"}
          count={25}
          position={[-25, 140, -45]}
        />
      </>
    ) : null;
  } else {
    return model ? (
      <>
        <group
          scale={scale}
          position={position}
          onClick={() => {
            setNewColor(randomColor());
            // setNewColor2(randomColor());
          }}
          rotation={[0, yRotate, 0]} //yRotate
        >
          <primitive object={model.scene} />
          <mesh
            scale={[1.1, 1.1, 1.1]}
            position={[0, 7.8, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            ref={mesh5}
          >
            <torusBufferGeometry attach="geometry" args={[2.4, 0.2, 50, 100]} />
            <meshBasicMaterial attach="material" color={newColor} />
          </mesh>
          <mesh
            ref={mesh6}
            scale={[1.1, 1.1, 1.1]}
            position={[0, 7.8, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <torusBufferGeometry attach="geometry" args={[1.2, 0.2, 50, 100]} />
            <meshBasicMaterial attach="material" color={newColor} />
          </mesh>
          <mesh position={[0, -2, 0]} rotation={[0, rotation * Math.PI, 0]}>
            <cylinderBufferGeometry
              attach="geometry"
              args={[rotation * 5, rotation * 15, 20, 6]}
            />
            <meshBasicMaterial
              transparent
              wireframe={true}
              attach="material"
              color={newColor}
            />
          </mesh>
          <mesh
            position={[0, -2, 0]}
            rotation={[0, -1 * rotation * Math.PI, 0]}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[rotation * 2, rotation * 6, 20, 6]}
            />
            <meshBasicMaterial
              transparent
              wireframe={true}
              attach="material"
              color={newColor}
            />
          </mesh>
        </group>
        <Particles
          ref={particleRef}
          color={"lightblue"}
          count={25}
          position={[-55, 140, -55]}
        />
        <Particles
          ref={particleRef2}
          color={"hotpink"}
          count={25}
          position={[-50, 140, -50]}
        />
        <Particles
          ref={particleRef3}
          color={"yellow"}
          count={25}
          position={[-25, 140, -45]}
        />
        <Balls
          ref={{ outerRef, middleRef, innerRef }}
          count={3}
          position={[0, 30, 0]}
        />
      </>
    ) : null;
  }
};

export default Mushroom;
