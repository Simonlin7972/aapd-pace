import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'

const path = window.location.pathname

if (path === '/export') {
  import('./Export.tsx').then(({ default: ExportPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ExportPage />
      </StrictMode>,
    )
  })
} else if (path === '/design-system') {
  import('./DesignSystem.tsx').then(({ default: DesignSystemPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <DesignSystemPage />
      </StrictMode>,
    )
  })
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
