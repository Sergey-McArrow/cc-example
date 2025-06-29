import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/login-page'
import ProtectedRoute from './features/auth/protected-route'
import PostDetails from './features/posts/post-details'
import PostsList from './features/posts/posts-list'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <PostsList />
        </ProtectedRoute>
      }
    />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/post/:id"
      element={
        <ProtectedRoute>
          <PostDetails />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRoutes
