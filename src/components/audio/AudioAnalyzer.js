import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

import { useFrame } from "react-three-fiber";
import { average} from "../../helpers/math.js";
// import Mushroom from "../models/Mushroom.js";
// import Mushroom2 from "../models/Mushroom2.js";
import Particles from "../models/Particles.js";

const AudioAnalyzer = ({ sound, model, model2, positions1, positions2 }) => {
  const analyser = useRef();
  const [mushroomData, setMushroomData] = useState();
  // const [mushroom2Data, setMushroom2Data] = useState();
  const [particleData, setParticleData] = useState();

  useEffect(
    () =>
      void (analyser.current = new THREE.AudioAnalyser(sound.current, 2048)),
    [sound]
  );
  useFrame(() => {
    if (analyser.current) {
      const data = analyser.current.getFrequencyData();
      // const averageFr = analyser.current.getAverageFrequency();
      const lowers1 = data.slice(0, data.length / 128 - 1);
      const lowers2 = data.slice(data.length / 128 - 1, data.length / 16);
      const uppers = data.slice(data.length / 2, data.length - 1);
      //   const lowerMax = max(lowers1);
      const lowerAvg = average(lowers1);
      const lower2Avg = average(lowers2);
      const upperAvg = average(uppers);
      //   const lowerMaxFr = lowerMax / lowers1.length;
      const lowerAvgFr = lowerAvg / lowers1.length;
      const lower2AvgFr = lower2Avg / lowers2.length;
      const upperAvgFr = upperAvg / uppers.length;
      setMushroomData({ lowerAvgFr, lower2AvgFr, upperAvgFr });
      // setMushroom2Data({ lowerAvgFr, lower2AvgFr, upperAvgFr });
      setParticleData({ upperAvgFr });
    }
  });
  return mushroomData ? (
    <group>
      {/* <Mushroom2 position={[0, -3, 0]} data={mushroomData} color={"pink"} /> */}
      <Particles
        data={particleData}
        color={"lightblue"}
        count={500}
        position={[-55, 140, -55]}
      />
      <Particles
        data={particleData}
        color={"hotpink"}
        count={500}
        position={[-50, 140, -50]}
      />
      <Particles
        data={particleData}
        color={"yellow"}
        count={500}
        position={[-25, 140, -45]}
      />
    </group>
  ) : null;
};

export default AudioAnalyzer;
