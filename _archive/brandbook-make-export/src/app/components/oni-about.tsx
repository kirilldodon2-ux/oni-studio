import { motion } from 'motion/react'
import aboutBg from '../../imports/Frame5/52b6466192ebce13cf280f19e641a5bb2cd0a1b8.png'

const BODY_PARAGRAPHS = [
  'ONI (ОНИ)\nВизуальная студия, специализирующаяся на 3D, разработке, моушне и digital-дизайне.',
  'Создаём визуалы, которые цепляют: 3D анимации, афиши, постеры и креатив для брендов, артистов и проектов.',
  'Быстрый темп и нестандартные задачи.\nМожем работать по готовому брифу или собрать концепт вместе с вами, если идеи пока только в голове.',
]

interface OniAboutProps {
  sectionRef: { current: HTMLElement | null }
}

export function OniAbout({ sectionRef }: OniAboutProps) {
  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070707] overflow-hidden"
      style={{ height: '100vh', scrollSnapAlign: 'start', flexShrink: 0 }}
    >
      {/* Background wire art */}
      <div className="absolute inset-0">
        <img
          src={aboutBg}
          alt=""
          className="absolute object-cover opacity-60"
          style={{ top: '-8%', right: '-5%', width: '55%', height: '115%' }}
          draggable={false}
        />
      </div>

      {/* Section label */}
      <motion.span
        className="absolute top-10 right-10 font-mono text-[11px] tracking-[0.3em] text-[#B2B2B2]"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: false }}
      >
        02 / 06
      </motion.span>

      <div className="relative z-10 flex flex-col justify-between h-full px-[5.2%] py-[9%]">
        {/* Title block */}
        <div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-[#F7F7F7] leading-none tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(60px, 8vw, 130px)',
              }}
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false }}
            >
              ABOUT US
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-[#B2B2B2] leading-none tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(60px, 8vw, 130px)',
              }}
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: false }}
            >
              О НАС
            </motion.h2>
          </div>
        </div>

        {/* Body text */}
        <div className="max-w-[460px] flex flex-col gap-5">
          {BODY_PARAGRAPHS.map((para, i) => (
            <motion.p
              key={i}
              className="text-white whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 300,
                fontSize: 'clamp(13px, 1.5vw, 18px)',
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 + i * 0.15 }}
              viewport={{ once: false }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
