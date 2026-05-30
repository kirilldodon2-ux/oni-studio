import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const COLORS = [
  {
    hex: 'F7F7F7',
    rgb: '247 247 247',
    cmyk: '0 0 0 3',
    bg: '#F7F7F7',
    text: '#070707',
    border: '1px solid #D0D0D0',
    label: 'ONI OFF-WHITE',
  },
  {
    hex: '070707',
    rgb: '7 7 7',
    cmyk: '0 0 0 97',
    bg: '#070707',
    text: '#F7F7F7',
    border: 'none',
    label: 'ONI DARK',
  },
  {
    hex: 'B2B2B2',
    rgb: '178 178 178',
    cmyk: '0 0 0 30',
    bg: '#B2B2B2',
    text: '#070707',
    border: 'none',
    label: 'ONI GRAY',
  },
]

interface OniColorsProps {
  sectionRef: { current: HTMLElement | null }
}

export function OniColors({ sectionRef }: OniColorsProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070707] overflow-hidden"
      style={{ height: '100vh', scrollSnapAlign: 'start', flexShrink: 0 }}
    >
      {/* Construction grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {['12.5%', '37.5%', '62.5%', '87.5%'].map((x, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-[2px]"
            style={{ left: x }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <svg className="absolute inset-0 w-full h-full" fill="none">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="#B2B2B2" strokeWidth="1.5" strokeDasharray="8 8" />
            </svg>
          </motion.div>
        ))}
        {['33%', '67%'].map((y, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-[1.5px]"
            style={{ top: y }}
            initial={{ scaleX: 0, originX: '50%' }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + i * 0.15 }}
          >
            <svg className="absolute inset-0 w-full h-full" fill="none">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="#B2B2B2" strokeWidth="1.5" strokeDasharray="8 8" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Section label */}
      <motion.span
        className="absolute top-10 left-10 text-[#B2B2B2] text-[11px] tracking-[0.3em]"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        04 / 06
      </motion.span>

      {/* COLORS / ЦВЕТА title */}
      <div className="absolute top-8 right-[5%]">
        <div className="overflow-hidden">
          <motion.h2
            className="text-[#F7F7F7] leading-none text-right"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(52px, 8vw, 120px)',
            }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            COLORS
          </motion.h2>
        </div>
      </div>

      <div className="absolute bottom-10 right-[5%]">
        <div className="overflow-hidden">
          <motion.p
            className="text-[#B2B2B2] leading-none text-right"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(52px, 8vw, 120px)',
            }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            ЦВЕТА
          </motion.p>
        </div>
      </div>

      {/* Color swatches — centered horizontally */}
      <div
        ref={contentRef}
        className="absolute left-0 right-0 flex gap-0"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        {COLORS.map((color, i) => (
          <motion.div
            key={i}
            className="flex-1 flex flex-col items-center justify-center py-8 gap-3"
            style={{ backgroundColor: color.bg, border: color.border as string }}
            initial={{ scaleY: 0, originY: '50%' }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.15 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
              className="text-center"
            >
              <p
                className="tracking-wider text-[11px] mb-1"
                style={{ fontFamily: 'var(--font-mono)', color: color.text, opacity: 0.5 }}
              >
                {color.label}
              </p>
              <p
                className="tracking-wider text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: color.text }}
              >
                HEX:{color.hex}
              </p>
              <p
                className="tracking-wider text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: color.text }}
              >
                RGB:{color.rgb}
              </p>
              <p
                className="tracking-wider text-[13px]"
                style={{ fontFamily: 'var(--font-mono)', color: color.text }}
              >
                CMYK:{color.cmyk}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
