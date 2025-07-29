import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './components/pages/login-page'
import RegisterPage from './components/pages/register-page'
import AuthLayout from './components/layouts/auth-layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
