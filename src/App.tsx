import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/login-page';
import { RegisterPage } from './pages/auth/register-page';
import { DashboardPage } from './pages/home/dashboard-page';
import { PrivateRoute } from './components/common/private-route';
import { ToastProvider } from './components/common/sonner-custom';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />

          <Route path="/" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
