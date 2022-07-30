import { useRef, useState, useLayoutEffect, useEffect} from "react";
import * as THREE from "three";
import io from "socket.io-client";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Sky,
  ContactShadows,
  Lightformer,
  BakeShadows,
} from "@react-three/drei";
import { DDSLoader } from "three-stdlib";
import Floor from "../enviroment/Floor";
import { Physics } from "@react-three/cannon";

const ENDPOINT = "http://localhost:3002";
const socket = io.connect(ENDPOINT);


function Rover(props) {
  const { scene } = useGLTF("/Perseverance.glb");
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.roughness = 0;
        obj.material.metalness = 0.5;
        obj.castShadow = obj.receiveShadow = true;
      }
    });
  }, []);
  return <primitive object={scene} {...props} />;
}

const Robot = () => {
    const [rotationRobot, setRotation] = useState([0,0,0])

    useEffect(() => {
        socket.on("gyroData", (data) => {
          const {x,y,z} = data[0];
          setRotation([x,y,z])
        });
      }, [socket]);


  return (
    <div style={{ position: "relative", width: "100%", height: 280 }}>
      <Canvas camera={{ fov: 45 }}>
        <Sky sunPosition={[20, 20, 20]} />
        <OrbitControls makeDefault></OrbitControls>
        <color attach="background" args={["#151520"]} />
        <hemisphereLight intensity={0.5} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <mesh
          scale={4}
          position={[3, 0.1, -1.5]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
        </mesh>
        <mesh
          scale={4}
          position={[1, 0.1, -1.5]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
        </mesh>
        <mesh
          scale={4}
          position={[0, 0.1, -2]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
        >
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
        </mesh>
        <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, 0.1, 0]}
          scale={15}
          blur={0.5}
          opacity={1}
          far={1}
        />
        <group position={[0, 0, 0]}>
          <Rover position={[0, 0.6, 0]} scale={2} rotation={rotationRobot} />
        </group>

        <Environment resolution={512}>
          {/* Ceiling */}
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -9]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 9]}
            scale={[10, 1, 1]}
          />
          {/* Sides */}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-50, 2, 0]}
            scale={[100, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[50, 2, 0]}
            scale={[100, 2, 1]}
          />
          {/* Key */}
          <Lightformer
            form="ring"
            color={[10, 0, 0]}
            scale={2}
            position={[10, 5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <BakeShadows />
        <Physics gravity={[0, -30, 0]}>
          <Floor />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Robot;
