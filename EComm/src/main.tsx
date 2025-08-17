import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './store/Store.tsx'
import AppRouter from './router/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <AppRouter />
  </Provider>,
)
