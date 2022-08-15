import React from 'react';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <Logo />
      <main className={styles.content} />
      <Footer />
    </div>
  );
}

export default App;
