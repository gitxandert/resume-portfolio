// src/components/DarkModeToggle.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sun  from '/sun.svg'
import Moon from '/moon.svg'

type Props = {
  mode: "light" | "dark"
  onToggle: () => void
  className?: string
}

export default function DarkModeToggle({
  mode,
  onToggle,
  className = "",
}: Props) {
  // keep the HTML <html> class in sync
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark")
    localStorage.setItem("theme", mode)
  }, [mode])


  // ─── render with AnimatePresence & motion.img ──────────────────────────────
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={['p-2','focus:outline-none', 'hover:cursor-pointer', className].join(' ')}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={mode}                                // forces remount on mode change
          src={mode === 'dark' ? Sun : Moon }        // pick the SVG
          alt={mode === 'dark' ? 'Moon icon' : 'Sun icon'}
          className="h-8 w-auto"
          initial={{ opacity: 0, rotate: mode === 'dark' ? -90 : 90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit   ={{ opacity: 0, rotate: mode === 'dark' ? 90 : -90 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </button>
  )
}
