import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Mail, Menu, Sparkles, X } from 'lucide-react'
import { useLang } from '../i18n'
import { ORIGINAL_SITE, VIDEO_SRC } from '../content'
import { useContactModal } from './Contact'

const LINKS = [
  ['/omoss', 'about'],
  ['/tjenester', 'services'],
  ['/nyheter', 'news'],
  ['/karriere', 'careers'],
  ['/kontakt', 'contact'],
]

/** Looping video behind everything. Shifts slightly with the mouse and darkens with scroll depth. */
function Background() {
  useEffect(() => {
    const root = document.documentElement
    const onMove = (e) => {
      root.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3))
      root.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3))
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      root.style.setProperty('--depth', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
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
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-neutral-900" aria-hidden="true">
      <video
        className="bg-video h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="bg-depth absolute inset-0" />
    </div>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="liquid-glass flex rounded-full p-1 text-xs" role="group" aria-label="Language">
      {['no', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-3 py-1.5 uppercase tracking-widest transition-colors ${
            lang === code ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
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

  const linkClass = ({ isActive }) =>
    `rounded-full px-3.5 py-2 text-sm transition-colors ${
      isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 lg:px-6">
      <div className="liquid-glass-strong mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2">
        <Link to="/" className="text-xl font-semibold tracking-[0.35em] text-white">
          ASPECTO
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map(([to, key]) => (
            <NavLink key={to} to={to} className={linkClass}>
              {t.nav[key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <button
            type="button"
            onClick={openContact}
            className="liquid-glass hidden items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 text-sm transition-transform hover:scale-105 active:scale-95 sm:flex"
          >
            {t.nav.cta}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </button>
          <button
            type="button"
            aria-label={t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="liquid-glass-strong fade-up mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-3xl p-3 lg:hidden"
          aria-label="Mobile"
        >
          {LINKS.map(([to, key]) => (
            <NavLink key={to} to={to} className={linkClass}>
              {t.nav[key]}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              openContact()
            }}
            className="rounded-full bg-white/15 px-3.5 py-2 text-left text-sm sm:hidden"
          >
            {t.nav.cta}
          </button>
        </nav>
      )}
    </header>
  )
}

function Footer({ className = '' }) {
  const { t } = useLang()
  return (
    <footer className={`px-4 pb-4 pt-16 lg:px-6 lg:pb-6 ${className}`}>
      <div className="liquid-glass-strong mx-auto grid max-w-7xl gap-10 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
        <div>
          <p className="text-xl font-semibold tracking-[0.35em]">ASPECTO</p>
          <p className="serif-italic mt-3 text-lg">{t.footer.tagline}</p>
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
          <Link to="/" className="text-white/80 transition-colors hover:text-white">
            {t.nav.home}
          </Link>
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
      <Background />
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
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 lg:px-6 lg:pt-24">
      <p className="fade-up text-xs uppercase tracking-widest text-white/50">{label}</p>
      <h1 className="fade-up mt-4 max-w-4xl text-5xl leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
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
