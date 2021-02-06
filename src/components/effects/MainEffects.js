import React, { useRef, useEffect } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass });

const MainEffects = () => {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  useEffect(() => composer.current.setSize(size.width, size.height), [size]);
  useFrame(() => {
    composer.current.render();
  }, 2);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[1, 1.2, 0, 0]} />
    </effectComposer>
  );
};

export default MainEffects;
