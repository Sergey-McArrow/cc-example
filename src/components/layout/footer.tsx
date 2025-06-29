import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    © {new Date().getFullYear()} Best Application
  </footer>
)

export default Footer
