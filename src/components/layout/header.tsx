import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import type { TRootState } from '../../app/store'
import { logout } from '../../features/auth/auth-slice'
import { Button } from '../ui/button'
import styles from './header.module.css'

export type THeaderProps = {}

const Header = () => {
  const user = useAppSelector((state: TRootState) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAuthClick = () => {
    if (user) {
      dispatch(logout())
    } else {
      navigate('/login')
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/">
          <div className={styles.title}>Best Application</div>
        </Link>
        <Button
          className={styles.signInBtn}
          onClick={handleAuthClick}
          variant={user ? 'destructive' : 'default'}
        >
          {user ? 'Log Out' : 'Sign In'}
        </Button>
      </div>
    </header>
  )
}

export default Header
