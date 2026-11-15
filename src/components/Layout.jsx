import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Mail, Moon, Plus, Sun } from 'lucide-react'
import { useLang } from '../i18n'
import { ORIGINAL_SITE, VIDEO_SRC } from '../content'
import { useContactModal } from './Contact'

export const EASE = [0.16, 1, 0.3, 1]

const LINKS = [
  ['/', 'home'],
  ['/omoss', 'about'],
  ['/tjenester', 'services'],
  ['/nyheter', 'news'],
  ['/karriere', 'careers'],
  ['/kontakt', 'contact'],
]

/** Looping video behind everything. Shifts slightly with the mouse and darkens with scroll depth. */
function Background({ home }) {
  useEffect(() => {
    const root = document.documentElement
    const onMove = (e) => {
      root.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3))
      root.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3))
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      root.style.setProperty('--depth', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
      // White theme: how much of the video is veiled. Only the homepage hero shows it clearly.
      const veil = home ? Math.min(1, window.scrollY / (window.innerHeight * 0.85)) : 1
      root.style.setProperty('--veil', veil.toFixed(3))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [home])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black" style={{ background: '#0a0a0a' }} aria-hidden="true">
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <video
          className="bg-video h-full w-full object-cover"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>
      <div className="bg-depth absolute inset-0" />
    </div>
  )
}

/** Simple wave-in-a-circle mark, used next to the wordmark. */
export function LogoMark({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 20c5-1 8-5 9-11M10.5 23.5c5-1.500 8.500-6 9.500-12.500M16 26c4.500-2 7.500-6.500 8-12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function initialTheme() {
  try {
    const saved = localStorage.getItem('aspecto-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return 'light'
}

/** Switches between the white and the dark version of the site. */
function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('aspecto-theme', theme)
    } catch {}
  }, [theme])

  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95 md:h-10 md:w-10"
    >
      {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
    </button>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div
      className="flex rounded-full bg-black/60 p-1 text-[11px] backdrop-blur-md"
      role="group"
      aria-label="Language"
    >
      {['no', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-2.5 py-1.5 uppercase tracking-widest transition-colors ${
            lang === code ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

function Nav() {
  const { t } = useLang()
  const openContact = useContactModal()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 p-4 md:px-8 md:py-6"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-full bg-black/60 p-1 text-white backdrop-blur-md md:pr-4"
            aria-label="Aspecto"
          >
            <LogoMark className="h-8 w-8" />
            <span className="hidden text-sm font-medium tracking-[0.3em] md:block">ASPECTO</span>
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5 text-[11px] font-medium text-black transition-transform hover:scale-105 active:scale-95"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white md:h-8 md:w-8">
              <Plus
                size={12}
                strokeWidth={3}
                className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
              />
            </span>
            {t.nav.menu}
          </button>

          <div className="hidden items-center gap-4 rounded-full bg-black/60 px-4 py-2.5 text-[11px] text-white/80 backdrop-blur-md md:flex">
            {t.brand.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <ThemeToggle />
          <LangToggle />
          <button
            type="button"
            onClick={openContact}
            aria-label={t.nav.cta}
            className="flex items-center gap-2.5 rounded-full bg-black/60 p-1 text-[11px] text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95 md:pr-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white md:h-8 md:w-8">
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-black" fill="currentColor" aria-hidden="true">
                <circle cx="3" cy="3" r="1.5" />
                <circle cx="9" cy="3" r="1.5" />
                <circle cx="3" cy="9" r="1.5" />
                <circle cx="9" cy="9" r="1.5" />
              </svg>
            </span>
            <span className="hidden md:block">{t.nav.cta}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            className="liquid-glass-strong pointer-events-auto mt-3 flex w-full max-w-sm flex-col rounded-3xl bg-black/50 p-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {LINKS.map(([to, key], i) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-baseline gap-4 rounded-2xl px-4 py-2.5 text-2xl font-light tracking-[-0.02em] transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                <span className="w-5 text-[11px] text-white/40">{String(i + 1).padStart(2, '0')}</span>
                {t.nav[key]}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Footer({ className = '' }) {
  const { t } = useLang()
  return (
    <footer className={`px-4 pb-4 pt-16 lg:px-6 lg:pb-6 ${className}`}>
      <div className="liquid-glass-strong mx-auto grid max-w-7xl gap-10 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-medium tracking-[0.3em]">
            <LogoMark /> ASPECTO
          </p>
          <p className="mt-4 text-sm text-white/80">{t.brand.line}</p>
          <p className="mt-2 text-sm text-white/50">{t.footer.tagline}</p>
        </div>
        <div className="text-sm text-white/60">
          <p className="mb-3 text-xs uppercase tracking-widest text-white/50">{t.nav.contact}</p>
          {t.footer.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <a
            href="mailto:post@aspecto.no"
            className="mt-3 inline-flex items-center gap-2 text-white transition-colors hover:text-white/80"
          >
            <Mail className="h-3.5 w-3.5" /> post@aspecto.no
          </a>
        </div>
        <nav className="flex flex-col gap-1.5 text-sm" aria-label="Footer">
          <p className="mb-1.5 text-xs uppercase tracking-widest text-white/50">{t.nav.menu}</p>
          {LINKS.map(([to, key]) => (
            <Link key={to} to={to} className="text-white/80 transition-colors hover:text-white">
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-white/60">
          <p>{t.footer.org}</p>
          <a
            href={`${ORIGINAL_SITE}/personvernerkl%C3%A6ring`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-white/80 transition-colors hover:text-white"
          >
            {t.footer.privacy}
          </a>
          <p className="mt-6 text-xs text-white/50">© 2025 by Norse Ocean.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Background home={pathname === '/'} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        {/* On the homepage, leave room for the depth meter on the right edge */}
        <Footer className={pathname === '/' ? 'lg:pr-[5.5rem]' : ''} />
      </div>
    </>
  )
}

/** Shared top-of-page header for the inner pages. */
export function PageHeader({ label, title, intro }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-32 lg:px-6 lg:pt-40">
      <p className="fade-up flex items-center gap-2.5 text-[13px] text-white/60">
        <span className="h-2 w-2 rounded-full bg-white" />
        {label}
      </p>
      <h1 className="fade-up mt-5 max-w-4xl text-5xl leading-none sm:text-6xl lg:text-7xl">
        {title[0]} <em>{title[1]}</em>
      </h1>
      {intro && (
        <p
          className="fade-up mt-8 max-w-3xl text-base leading-relaxed text-white/80 lg:text-lg"
          style={{ animationDelay: '120ms' }}
        >
          {intro}
        </p>
      )}
    </section>
  )
}
