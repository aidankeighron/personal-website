import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Aidan Keighron</p>
      </div>

      <div className={styles.timeline}>
        <div className={styles.card}>
          <h3>Alchemy</h3>
          <p>Language: JavaScript</p>
          <p>Tech Stack: Electron and Firebase Firestore</p>
          <p>Personal task organization software</p>
          <a href="https://github.com/aidankeighron/alchemy">GitHub</a>
        </div>
        <div className={[styles.cardOther, styles.card].join(" ")}>
          <h3>PID Visualizer</h3>
          <p>Language: Java</p>
          <p>Tech Stack: Swing</p>
          <p>Visualization of a PID controller</p>
          <a href="https://github.com/aidankeighron/PID-Visualizer">GitHub</a>
        </div>
        <div className={styles.card}>
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
