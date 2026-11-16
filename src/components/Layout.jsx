import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Mail } from 'lucide-react'
import { useLang } from '../i18n'
import { asset, ORIGINAL_SITE, VIDEO_SRC } from '../content'
import { useContactModal } from './Contact'

export const EASE = [0.16, 1, 0.3, 1]

const LINKS = [
  ['/omoss', 'about'],
  ['/tjenester', 'services'],
  ['/nyheter', 'news'],
  ['/karriere', 'careers'],
  ['/kontakt', 'contact'],
]

/** Looping video behind everything. Clear in the homepage hero, veiled in white elsewhere. */
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
      // How much of the video is veiled. Only the homepage hero shows it clearly.
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
    <div className="fixed inset-0 z-0 overflow-hidden bg-neutral-950" aria-hidden="true">
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

export function Logo({ className = 'h-8' }) {
  return <img src={asset('logo.svg')} alt="Aspecto" className={`w-auto ${className}`} />
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex rounded-full bg-black/5 p-1 text-[11px]" role="group" aria-label="Language">
      {['no', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-2.5 py-1.5 uppercase tracking-widest transition-colors ${
            lang === code ? 'bg-black text-white' : 'text-black/60 hover:text-black'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

const linkClass = ({ isActive }) =>
  `shrink-0 rounded-full px-2 py-2 text-xs transition-colors lg:px-3.5 lg:text-[13px] ${
    isActive ? 'bg-black/10 text-black' : 'text-black/70 hover:text-black'
  }`

/** White header bar: logo, the full menu (always visible), language and consultation button. */
function Nav() {
  const { t } = useLang()
  const openContact = useContactModal()

  const links = LINKS.map(([to, key]) => (
    <NavLink key={to} to={to} className={linkClass}>
      {t.nav[key]}
    </NavLink>
  ))

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 p-3 md:px-6 md:py-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="mx-auto max-w-7xl rounded-[1.75rem] bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 py-2 pl-5 pr-2">
          <Link to="/" aria-label="Aspecto" className="shrink-0">
            <Logo className="h-9 md:h-10" />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {links}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle />
            <button
              type="button"
              onClick={openContact}
              className="flex items-center gap-2.5 rounded-full bg-black py-1.5 pl-4 pr-1.5 text-[13px] font-medium text-white transition-transform hover:scale-105 active:scale-95"
            >
              <span className="hidden sm:block">{t.nav.cta}</span>
              <span className="sm:hidden">{t.nav.contact}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Phones and tablets: the menu stays visible as a second row you can swipe sideways */}
        <nav
          className="flex justify-between overflow-x-auto px-3 pb-2 lg:hidden"
          aria-label="Main"
          style={{ scrollbarWidth: 'none' }}
        >
          {links}
        </nav>
      </div>
    </motion.header>
  )
}

function Footer({ className = '' }) {
  const { t } = useLang()
  return (
    <footer className={`px-4 pb-4 pt-16 lg:px-6 lg:pb-6 ${className}`}>
      <div className="liquid-glass-strong mx-auto grid max-w-7xl gap-10 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
        <div>
          <Logo className="h-12" />
          <p className="mt-4 text-sm text-black/80">{t.brand.line}</p>
          <p className="mt-2 text-sm text-black/50">{t.footer.tagline}</p>
        </div>
        <div className="text-sm text-black/60">
          <p className="mb-3 text-xs uppercase tracking-widest text-black/50">{t.nav.contact}</p>
          {t.footer.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <a
            href="mailto:post@aspecto.no"
            className="mt-3 inline-flex items-center gap-2 text-black transition-colors hover:text-black/80"
          >
            <Mail className="h-3.5 w-3.5" /> post@aspecto.no
          </a>
        </div>
        <nav className="flex flex-col gap-1.5 text-sm" aria-label="Footer">
          <p className="mb-1.5 text-xs uppercase tracking-widest text-black/50">{t.nav.menu}</p>
          <Link to="/" className="text-black/80 transition-colors hover:text-black">
            {t.nav.home}
          </Link>
          {LINKS.map(([to, key]) => (
            <Link key={to} to={to} className="text-black/80 transition-colors hover:text-black">
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-black/60">
          <p>{t.footer.org}</p>
          <a
            href={`${ORIGINAL_SITE}/personvernerkl%C3%A6ring`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-black/80 transition-colors hover:text-black"
          >
            {t.footer.privacy}
          </a>
          <p className="mt-6 text-xs text-black/50">© 2025 by Norse Ocean.</p>
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

/** Shared top-of-page header for the inner pages, with an optional photo. */
export function PageHeader({ label, title, intro, image, imageAlt = '' }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-40 lg:px-6 lg:pt-44">
      <div className={image ? 'grid items-end gap-10 lg:grid-cols-[3fr_2fr]' : ''}>
        <div>
          <p className="fade-up flex items-center gap-2.5 text-[13px] text-black/60">
            <span className="h-2 w-2 rounded-full bg-black" />
            {label}
          </p>
          <h1 className="fade-up mt-5 max-w-4xl text-5xl leading-none sm:text-6xl lg:text-7xl">
            {title[0]} <em>{title[1]}</em>
          </h1>
          {intro && (
            <p
              className="fade-up mt-8 max-w-3xl text-base leading-relaxed text-black/80 lg:text-lg"
              style={{ animationDelay: '120ms' }}
            >
              {intro}
            </p>
          )}
        </div>
        {image && (
          <img
            src={asset(image)}
            alt={imageAlt}
            className="fade-up aspect-[4/3] w-full rounded-3xl object-cover"
            style={{ animationDelay: '200ms' }}
          />
        )}
      </div>
    </section>
  )
}
