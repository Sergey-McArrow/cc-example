import { Toaster } from 'sonner'
import Layout from './components/layout/layout'
import AppRoutes from './routes'
import './styles/animations.css'

const App = () => (
  <>
    <Layout>
      <AppRoutes />
    </Layout>
    <Toaster />
  </>
)

export default App
