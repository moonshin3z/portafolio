import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import { ReducedMotionProvider } from './contexts/ReducedMotionContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ReducedMotionProvider>
        <App />
      </ReducedMotionProvider>
    </ThemeProvider>
  </StrictMode>,
)
