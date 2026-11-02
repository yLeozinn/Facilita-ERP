import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ProtectedRoute from './components/ProtectedRoute'
import CadastroScreen from './screens/CadastroScreen'

export default function App() {
  useEffect(() => {
    const theme = localStorage.getItem('facilita_theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<CadastroScreen />} />
        <Route path="/*" element={<ProtectedRoute />} />
      </Routes>
    </BrowserRouter>
  )
}