import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './styles.css'
import App from './App.tsx'

registerSW({ immediate: true })

const path = window.location.pathname

if (path === '/export') {
  import('./Export.tsx').then(({ default: ExportPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ExportPage />
      </StrictMode>,
    )
  })
} else if (path === '/design-system/button') {
  import('./ButtonDoc.tsx').then(({ default: ButtonDocPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ButtonDocPage />
      </StrictMode>,
    )
  })
} else if (path === '/design-system/segmented-control') {
  import('./SegmentedControlDoc.tsx').then(({ default: SegmentedControlDocPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <SegmentedControlDocPage />
      </StrictMode>,
    )
  })
} else if (path === '/design-system/hours-slider') {
  import('./HoursSliderDoc.tsx').then(({ default: HoursSliderDocPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <HoursSliderDocPage />
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
} else if (path === '/deck') {
  import('./Deck.tsx').then(({ default: DeckPage }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <DeckPage />
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
