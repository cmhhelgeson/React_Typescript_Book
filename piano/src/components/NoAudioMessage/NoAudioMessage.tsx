import styles from "./NoAudioMessage.module.css"

export const NoAudioMessage = () => {
  return (
    <div>
      <p>Sorry, it's not gonna work :-(</p>
      <p>Your browser doesn't support <code>Audio API</code></p>
    </div>
  );
}