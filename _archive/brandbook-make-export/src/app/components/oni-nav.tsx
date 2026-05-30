import { motion } from 'motion/react'

const SECTIONS = ['COVER', 'ABOUT', 'LOGO', 'COLORS', 'FONTS', 'LINKS']

// Which sections have dark background (need light-colored nav elements)
const DARK_BG_SECTIONS = new Set([1, 2, 3])

interface OniNavProps {
  active: number
  onNavigate: (index: number) => void
}

export function OniNav({ active, onNavigate }: OniNavProps) {
  const isDark = DARK_BG_SECTIONS.has(active)
  const dotColor = isDark ? '#F7F7F7' : '#070707'
  const inactiveColor = isDark ? 'rgba(178,178,178,0.6)' : '#B2B2B2'
  const labelColor = isDark ? '#B2B2B2' : '#B2B2B2'

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end">
      {SECTIONS.map((label, i) => {
        const isActive = active === i
        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className="group flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0"
            aria-label={`Go to ${label}`}
          >
            <motion.span
              className="text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none"
              style={{
                color: isActive ? dotColor : labelColor,
                fontFamily: 'var(--font-mono)',
              }}
              animate={{ color: isActive ? dotColor : labelColor }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>

            <div className="relative flex items-center justify-center w-4 h-4">
              <motion.div
                className="rounded-full"
                animate={{
                  width: isActive ? 10 : 4,
                  height: isActive ? 10 : 4,
                  backgroundColor: isActive ? dotColor : inactiveColor,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              {isActive && (
                <motion.div
                  className="absolute rounded-full"
                  style={{ border: `1px solid ${dotColor}`, width: 16, height: 16 }}
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.2 }}
                />
              )}
            </div>
          </button>
        )
      })}
    </nav>
  )
}
