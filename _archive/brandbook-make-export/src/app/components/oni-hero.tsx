import { motion } from 'motion/react'
import svgPaths from '../../imports/Frame4/svg-915q4u36n2'
import heroBg from '../../imports/Frame4/4eb5d3d61a7f0fa7bade0165667b25b124c1ca2a.png'

const TITLE_LINES = ['ONI(ОНИ)', 'BRANDBOOK', '2026']

interface OniHeroProps {
  sectionRef: { current: HTMLElement | null }
}

export function OniHero({ sectionRef }: OniHeroProps) {
  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ height: '100vh', scrollSnapAlign: 'start', flexShrink: 0 }}
    >
      {/* Background wire art */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-70"
          draggable={false}
        />
      </div>

      {/* Section label */}
      <motion.span
        className="absolute top-10 left-10 font-mono text-[11px] tracking-[0.3em] text-[#B2B2B2]"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        01 / 06
      </motion.span>

      {/* Logo construction */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo SVG - draws in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <svg
            viewBox="0 0 272 312.18"
            className="w-28 h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d={svgPaths.p17d3a380}
              fill="#070707"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Title text lines */}
        <div className="mt-6 flex flex-col items-center gap-0.5">
          {TITLE_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="text-[#B2B2B2] text-[13px] tracking-[0.35em] text-center"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 400 }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 + i * 0.12 }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical scroll line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1.6 }}
        >
          <div className="w-[2px] h-24 bg-[#070707] rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
