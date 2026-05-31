import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './components/AuthPage'
import DashboardLayout from './components/DashboardLayout'
import CountryDetailPanel from './components/CountryDetailPanel'

function RootRedirect() {
  const { isAuthenticated, ready } = useAuth()

  if (!ready) {
    return <div className="page-loader">Loading WanderLog...</div>
  }

  return <Navigate to={isAuthenticated ? '/app' : '/login'} replace />
}

function NotFoundRoute() {
  const location = useLocation()
  return <Navigate to={location.pathname.startsWith('/app') ? '/app' : '/'} replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<CountryDetailPanel />} />
          <Route path="country/:code" element={<CountryDetailPanel />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  )
}

export default App
