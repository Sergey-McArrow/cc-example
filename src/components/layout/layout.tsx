import { Toaster } from '../ui/sonner'
import Footer from './footer'
import Header from './header'
import styles from './layout.module.css'

export type TLayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<TLayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
    <Toaster />
  </div>
)

export default Layout
