import styles from "./Logo.module.css"

export const Logo = () => {
    return (
        <h1 className={styles.logo}>
            <span role="img" aria-label="metal hand emoji">
                *Metal Hand Emoji*
            </span>
            <span>
                *Musical Keyboard Emoji*
            </span>
            <span>
                *Musical Notes Emoji*
            </span>
        </h1>
    )
}