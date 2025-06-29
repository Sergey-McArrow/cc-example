import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { TRootState } from '../../app/store'

type TProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: TRootState) => state.auth.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
