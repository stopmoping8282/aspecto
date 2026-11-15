import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Mail, Phone } from 'lucide-react'
import { useLang } from '../i18n'
import { ORIGINAL_SITE, team } from '../content'
import { useContactModal } from './Contact'
import { Glass, IconDot, Label, Reveal, Title } from './ui'

export function Section({ className = '', children, ...rest }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-24 ${className}`} {...rest}>
      {children}
    </section>
  )
}

/** Pill button in the reference style: label plus a round icon. */
export function PillButton({ children, icon: Icon = ArrowRight, onClick, to, className = '' }) {
  const cls = `liquid-glass-strong inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm text-white transition-transform hover:scale-105 active:scale-95 ${className}`
  const inner = (
    <>
      {children}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
        <Icon className="h-3.5 w-3.5" />
      </span>
    </>
  )
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

export function NewsCards() {
  const { t } = useLang()
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {t.news.items.map((item, i) => (
        <Reveal key={item.href} delay={i * 100}>
          <Glass
            as="a"
            tilt
            href={ORIGINAL_SITE + item.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-full min-h-56 flex-col justify-between gap-8 rounded-3xl p-6"
          >
            <span className="serif-italic text-3xl">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block text-lg leading-snug">{item.title}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                {t.news.read} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </span>
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}

export function Newsletter() {
  const { t } = useLang()
  const [done, setDone] = useState(false)
  return (
    <Reveal>
      <Glass strong className="rounded-[2.5rem] p-7 lg:flex lg:items-center lg:gap-10 lg:p-10">
        <p className="max-w-xl text-base leading-relaxed text-white/80">{t.news.newsletter}</p>
        {done ? (
          <p className="fade-up mt-5 text-sm lg:ml-auto lg:mt-0" role="status">
            {t.news.subscribed}
          </p>
        ) : (
          <form
            className="mt-5 flex flex-1 gap-2 lg:mt-0"
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <input
              type="email"
              required
              aria-label={t.news.emailPlaceholder}
              placeholder={t.news.emailPlaceholder}
              className="field !rounded-full"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white/15 px-5 text-sm transition-transform hover:scale-105 active:scale-95"
            >
              {t.news.subscribe}
            </button>
          </form>
        )}
      </Glass>
    </Reveal>
  )
}

export function TeamGrid() {
  const { t, lang } = useLang()
  return (
    <>
      <Reveal>
        <Title parts={t.teamSection.title} className="text-4xl lg:text-5xl" />
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80">{t.teamSection.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((p, i) => (
          <Reveal key={p.email} delay={i * 80}>
            <Glass tilt className="flex h-full flex-col rounded-3xl p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm">
                {p.name
                  .replace(', PhD', '')
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
              <h3 className="mt-5 text-xl">{p.name}</h3>
              <p className="serif-italic mt-1 text-base">{p.role[lang]}</p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-white/80">
                <a
                  href={`tel:+47${p.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" /> {p.phone}
                </a>
                <a
                  href={`mailto:${p.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" /> {p.email}
                </a>
              </div>
            </Glass>
          </Reveal>
        ))}
      </div>
    </>
  )
}

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBand({ title, text }) {
  const { t } = useLang()
  const openContact = useContactModal()
  return (
    <Section>
      <Reveal>
        <Glass strong className="rounded-[2.5rem] px-7 py-14 text-center lg:py-20">
          <Label>{t.cta.label}</Label>
          <Title
            parts={title ?? t.cta.title}
            className="mx-auto mt-4 max-w-3xl text-5xl leading-[1.05] tracking-[-0.05em] lg:text-7xl"
          />
          <p className="mx-auto mt-5 max-w-xl text-base text-white/80">{text ?? t.cta.text}</p>
          <PillButton onClick={openContact} className="mt-8">
            {t.cta.button}
          </PillButton>
        </Glass>
      </Reveal>
    </Section>
  )
}

export { IconDot }
