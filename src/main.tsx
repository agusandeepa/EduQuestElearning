import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'sonner'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <App />
    </AuthProvider>
  </StrictMode>,
)
