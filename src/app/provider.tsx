import { Provider } from 'react-redux'
import { store } from './store'

export type TProviderProps = {
  children: React.ReactNode
}

const AppProvider: React.FC<TProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default AppProvider
