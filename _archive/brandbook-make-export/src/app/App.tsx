import { useRef, useState, useCallback, useEffect } from 'react'
import { OniHero } from './components/oni-hero'
import { OniAbout } from './components/oni-about'
import { OniLogo } from './components/oni-logo'
import { OniColors } from './components/oni-colors'
import { OniFonts } from './components/oni-fonts'
import { OniLinks } from './components/oni-links'
import { OniNav } from './components/oni-nav'

const SECTION_COUNT = 6

export default function App() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLElement>(null)
  const colorsRef = useRef<HTMLElement>(null)
  const fontsRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLElement>(null)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const { scrollTop, clientHeight } = container
    if (clientHeight === 0) return
    const idx = Math.min(Math.round(scrollTop / clientHeight), SECTION_COUNT - 1)
    setActiveSection(idx)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' })
  }, [])

  return (
    <div className="relative w-full h-screen">
      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-scroll"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <OniHero sectionRef={heroRef} />
        <OniAbout sectionRef={aboutRef} />
        <OniLogo sectionRef={logoRef} />
        <OniColors sectionRef={colorsRef} />
        <OniFonts sectionRef={fontsRef} />
        <OniLinks sectionRef={linksRef} />
      </div>

      <OniNav active={activeSection} onNavigate={scrollTo} />
    </div>
  )
}
