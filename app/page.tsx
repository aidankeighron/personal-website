'use client'

import css from "./page.module.css";
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
export default function Home() {
  return(
    <main className={css.main}>
      <div className={css.scene}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
      <div className={css.header}>
        <p>Aidan Keighron</p>
      </div>
      <div className={css.timeline}>
        <div className={css.card}>
          <h3>Alchemy</h3>
          <p>Language: JavaScript</p>
          <p>Tech Stack: Electron and Firebase Firestore</p>
          <p>Personal task organization software</p>
          <a href="https://github.com/aidankeighron/alchemy">GitHub</a>
        </div>
        <div className={[css.cardOther, css.card].join(" ")}>
          <h3>PID Visualizer</h3>
          <p>Language: Java</p>
          <p>Tech Stack: Swing</p>
          <p>Visualization of a PID controller</p>
          <a href="https://github.com/aidankeighron/PID-Visualizer">GitHub</a>
        </div>
        <div className={css.card}>
          <h3>Fantasy FRC</h3>
          <p>Languages: JavaScript, HTML, and CSS</p>
          <p>Tech Stack: Express and Socket.io</p>
          <p>Fantasy football but robotics</p>
          <a href="https://github.com/aidankeighron/Fantasy-FRC">GitHub</a>
        </div>
      </div>
    </main>
  );
}