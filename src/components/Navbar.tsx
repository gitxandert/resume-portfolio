import { Link, useLocation } from "react-router-dom"
import { motion, useMotionValue, animate } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import DarkModeToggle from "./DarkModeToggle"
import LogoLight from "/xt_logo.svg"
import LogoDark  from "/logo_xt.svg"

const links = [
  { to: "/",        label: "Home"     },
  { to: "/projects",label: "Projects" },
  { to: "/resume",  label: "Résumé"   },
  { to: "/contact", label: "Contact"  },
]

export default function Navbar() {
  const { pathname } = useLocation()

  // ─── 1) ROTATION MOTION VALUE ───────────────────────────────
  const rotateY      = useMotionValue(0)
  const thresholdRef = useRef(0)
  const hasSwapped   = useRef(false)
  const pendingLogo  = useRef<"light"|"dark"|null>(null)

  // ─── 2) THEME STATE ───────────────────────────────────────────
  const [mode, setMode] = useState<"light"|"dark">(() => {
    if (typeof window === "undefined") return "light"
    return localStorage.getItem("theme") === "dark" ? "dark" : "light"
  })
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark")
    localStorage.setItem("theme", mode)
  }, [mode])

  // ─── 3) LOGO STATE ────────────────────────────────────────────
  //    what we're actually rendering
  const [logoMode, setLogoMode] = useState<"light"|"dark">(mode)

  // ─── 4) SUBSCRIBE TO ROTATE CHANGES ───────────────────────────
  useEffect(() => {
    // .onChange is the MotionValue API
    const unsubscribe = rotateY.onChange((y) => {
      if (
        pendingLogo.current != null &&
        !hasSwapped.current &&
        y >= thresholdRef.current
      ) {
        hasSwapped.current  = true
        setLogoMode(pendingLogo.current)
        pendingLogo.current = null
      }
    })
    return unsubscribe
  }, [rotateY])

  // ─── 5) FLIP FUNCTION ─────────────────────────────────────────
  function doFlip(nextLogo: "light" | "dark" | null) {
    hasSwapped.current  = false
    pendingLogo.current = nextLogo

    const start     = rotateY.get()
    thresholdRef.current = start + 90
    const target    = start + 180

    // animate the MotionValue directly
    animate(rotateY, target, {
      duration: 0.8,
      ease: "easeInOut",
    })
  }

  // ─── 6) HANDLERS ───────────────────────────────────────────────
  const handleNavClick = () => doFlip(null)

  const handleThemeToggle = () => {
    // swap the _site theme_ immediately:
    const next = mode === "dark" ? "light" : "dark"
    setMode(next)

    // then kick off the flip and schedule the logo swap:
    doFlip(next)
  }

  // pick which SVG to show at any moment
  const logoSrc = logoMode === "dark" ? LogoDark : LogoLight

  const prevPath = useRef(pathname)
  useEffect(() => {
    if (prevPath.current !== pathname) {
      handleNavClick()
      prevPath.current = pathname
    }
  }, [pathname])

  return (
    <nav
      className="sticky top-0 inset-x-0 bg-neutral-900 text-white px-6 py-3 flex items-center justify-center z-50"
      style={{ perspective: 800 }}
    >
      <motion.img
        src={logoSrc}
        alt="Logo"
        onClick={handleNavClick}
        className="relative -left-6 h-8 w-auto hover:scale-110 cursor-pointer"
        style={{
          // bind our rotating MotionValue into the CSS transform
          rotateY,
          transformOrigin: "center center",
        }}
      />

      <div className="flex items-center gap-6">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={handleNavClick}
            className={
              pathname === l.to
                ? "font-semibold border-b-2 border-indigo-400 dark:border-red-400 text-cyan-200 dark:text-red-200 inline-block transform transition-all duration-300 ease-out hover:scale-105"
                : "hover:text-indigo-300 hover:dark:text-rose-300 text-white inline-block transform transition-all duration-300 ease-out hover:scale-105"
            }
          >
            {l.label}
          </Link>
        ))}
      </div>

      <DarkModeToggle
        mode={mode}
        onToggle={handleThemeToggle}
        className="relative left-5 w-auto cursor-pointer transition-transform hover:scale-110"
      />
    </nav>
  )
}
