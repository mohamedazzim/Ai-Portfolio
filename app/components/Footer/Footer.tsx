import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>MAZ<span className={styles.dot}>.</span></span>
          <p className={styles.copy}>© {new Date().getFullYear()} Mohamed Azzim J. All rights reserved.</p>
        </div>
        <p className={styles.made}>Crafted with <span className={styles.heart}>♥</span> in India</p>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href="#about" className={styles.link}>About</a>
          <a href="#projects" className={styles.link}>Projects</a>
          <a href="#contact" className={styles.link}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}
