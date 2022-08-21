import React from 'react';
import { Main } from './components/Main';
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <main className={styles.content}>
        <Main/>
      </main>
    </div>
  );
}

export default App;
