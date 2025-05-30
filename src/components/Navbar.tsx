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
  const [menuOpen, setMenuOpen] = useState(false);

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
  const handleNavClick = () => {
    doFlip(null);
    setMenuOpen(false);
  }

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
  <nav className="w-full sticky top-0 inset-x-0 bg-neutral-900 text-white z-50">
    {/* Centered content */}
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between py-3 px-4 sm:px-8">
      <motion.img
        src={logoSrc}
        alt="Logo"
        onClick={handleNavClick}
        className="relative h-8 w-auto hover:scale-110 cursor-pointer"
        style={{
          // bind our rotating MotionValue into the CSS transform
          rotateY,
          transformOrigin: "center center",
        }}
      />

      <button
        className="flex flex-col gap-1 sm:hidden ml-auto p-2"
        aria-label="Open menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="block w-6 h-0.5 bg-white rounded transition-all"></span>
        <span className="block w-6 h-0.5 bg-white rounded transition-all"></span>
        <span className="block w-6 h-0.5 bg-white rounded transition-all"></span>
      </button>

      <div className="hidden sm:flex items-center gap-6">
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
        className="relative w-auto cursor-pointer transition-transform hover:scale-110"
      />

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-center justify-start pt-20 sm:hidden">
          <div className="flex flex-col items-center gap-8">
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
            <DarkModeToggle
              mode={mode}
              onToggle={handleThemeToggle}
              className="mx-auto mt-4 w-auto cursor-pointer transition-transform hover:scale-110"
            />
          </div>
          {/* Optional: close overlay on click outside */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
      )}
      </div>
    </nav>
  )
}
