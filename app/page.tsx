'use client'

import css from "./page.module.css";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from "./components/Scene";
import { Physics } from "@react-three/cannon";

export default function Home() {
  return(
    <main className={css.main}>
      <div className={css.scene}>
        <Canvas>
          <Physics
            broadphase="SAP" gravity={[0, -2.6, 0]}>
            <Scene />
          </Physics>
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