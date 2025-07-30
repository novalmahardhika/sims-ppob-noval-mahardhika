import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { persistor, store } from './lib/features/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { setAuthToken } from './lib/auth-token.ts'
import { fetchCurrentUser } from './lib/features/auth/auth-slice.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          const token = store.getState().auth.token
          if (token) {
            setAuthToken(token)
            store.dispatch(fetchCurrentUser())
          }
        }}
      >
        <App />
        <Toaster theme='light' richColors />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
