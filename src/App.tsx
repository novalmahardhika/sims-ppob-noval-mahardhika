import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './components/pages/login-page'
import RegisterPage from './components/pages/register-page'
import AuthLayout from './components/layouts/auth-layout'
import MainPage from './components/pages/main-page'
import { MainLayout } from './components/layouts/main-layout'
import TopUpPage from './components/pages/topup-page'
import TransactionPage from './components/pages/transaction-page'
import AccountPage from './components/pages/account-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path='/topup' element={<TopUpPage />} />
          <Route path='/transaction' element={<TransactionPage />} />
          <Route path='/account' element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
