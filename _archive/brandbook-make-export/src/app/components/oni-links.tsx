import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const LINKS = [
  { platform: 'telegram', handle: '@onivisialstudio', url: 'https://t.me/onivisialstudio' },
  { platform: 'instagram', handle: '@onivisialstudio', url: 'https://instagram.com/onivisialstudio' },
]

interface OniLinksProps {
  sectionRef: { current: HTMLElement | null }
}

function TypedText({ text, delay, isInView }: { text: string; delay: number; isInView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {text}
    </motion.span>
  )
}

export function OniLinks({ sectionRef }: OniLinksProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ height: '100vh', scrollSnapAlign: 'start', flexShrink: 0 }}
    >
      {/* Section label */}
      <motion.span
        className="absolute top-10 left-10 text-[#B2B2B2] text-[11px] tracking-[0.3em]"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        06 / 06
      </motion.span>

      {/* LINKS / ССЫЛКИ — top right */}
      <div className="absolute top-8 right-[5%]">
        <div className="overflow-hidden">
          <motion.h2
            className="text-[#070707] leading-none text-right"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(52px, 9vw, 130px)',
            }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            LINKS
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="text-[#B2B2B2] leading-none text-right"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(52px, 9vw, 130px)',
            }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            ССЫЛКИ
          </motion.p>
        </div>
      </div>

      {/* Dashed vertical line + links at bottom left */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-[6.5%]"
        style={{ top: '75%' }}
      >
        {/* Dashed vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px]">
          <motion.div
            className="w-full h-full"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <svg className="h-full" width="3" fill="none">
              <line
                x1="1.5" y1="0" x2="1.5" y2="100%"
                stroke="#B2B2B2" strokeWidth="2" strokeDasharray="8 8"
              />
            </svg>
          </motion.div>
        </div>

        {/* Link items */}
        <div className="pl-10 flex flex-col justify-center h-full gap-6">
          {LINKS.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 no-underline"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 + i * 0.15 }}
              whileHover={{ x: 6 }}
            >
              <span
                className="text-black"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(14px, 1.8vw, 24px)',
                  fontWeight: 400,
                }}
              >
                {link.platform}
                <span className="text-[#B2B2B2]">^</span>
                {'  '}
                <span className="group-hover:underline underline-offset-4 decoration-[#B2B2B2]">
                  {link.handle}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <motion.div
        className="absolute bottom-6 right-[5%] text-right"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p
          className="text-[#B2B2B2] text-[11px] tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ONI VISUAL STUDIO © 2026
        </p>
      </motion.div>
    </section>
  )
}
