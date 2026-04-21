import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './deck/deck-stage.js'
import { deckCSS } from './deck/deck-styles'
import slidesHTML from './deck/slides.html?raw'
import coverAHTML from './deck/cover-a.html?raw'
import coverBHTML from './deck/cover-b.html?raw'

const COVER_KEY = 'pace-deck-cover-variant'

type CoverVariant = 'a' | 'b'

const loadStoredCover = (): CoverVariant =>
  localStorage.getItem(COVER_KEY) === 'b' ? 'b' : 'a'

export default function Deck() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [cover, setCover] = useState<CoverVariant>(loadStoredCover)

  useEffect(() => {
    document.title = 'Pace · 產品簡報'
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const container = root.querySelector<HTMLElement>('#cover-container')
    if (container) container.innerHTML = cover === 'b' ? coverBHTML : coverAHTML

    const btnA = root.querySelector<HTMLButtonElement>('#cov-a')
    const btnB = root.querySelector<HTMLButtonElement>('#cov-b')
    const paint = (el: HTMLButtonElement | null, active: boolean) => {
      if (!el) return
      el.style.background = active ? 'var(--ink)' : 'var(--elevated)'
      el.style.color = active ? 'var(--bg)' : 'var(--ink)'
    }
    paint(btnA, cover === 'a')
    paint(btnB, cover === 'b')

    const onA = () => setCover('a')
    const onB = () => setCover('b')
    btnA?.addEventListener('click', onA)
    btnB?.addEventListener('click', onB)

    localStorage.setItem(COVER_KEY, cover)

    return () => {
      btnA?.removeEventListener('click', onA)
      btnB?.removeEventListener('click', onB)
    }
  }, [cover])

  return (
    <div ref={rootRef} className="deck-root">
      <style>{deckCSS}</style>
      <div
        dangerouslySetInnerHTML={{
          __html: `<deck-stage width="1920" height="1080">${slidesHTML}</deck-stage>`,
        }}
      />
    </div>
  )
}
