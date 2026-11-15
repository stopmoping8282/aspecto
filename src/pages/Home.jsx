import { ArrowDown, ArrowRight, LifeBuoy, Mail, Plus, Radar, Sparkles, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import DepthMeter from '../components/DepthMeter'
import ServiceExplorer from '../components/ServiceExplorer'
import { CtaBand, NewsCards, PillButton, Section } from '../components/Sections'
import { Glass, IconDot, Label, Reveal, Title } from '../components/ui'

function Hero() {
  const { t } = useLang()
  const h = t.hero
  const dive = () => document.getElementById('dive')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl gap-4 px-4 pb-4 pt-4 lg:gap-6 lg:px-6 lg:pb-6">
      {/* Left panel */}
      <div className="liquid-glass-strong flex w-full flex-col rounded-3xl p-6 lg:w-[52%] lg:p-10">
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <span className="fade-up flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <Waves className="h-9 w-9" strokeWidth={1.5} />
          </span>
          <h1
            className="fade-up mt-8 text-4xl leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl lg:text-[3.4rem] xl:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            {h.title[0]}
            <br />
            <em>{h.title[1]}</em>
          </h1>
          <p
            className="fade-up mt-6 max-w-md text-sm leading-relaxed text-white/80 lg:text-base"
            style={{ animationDelay: '160ms' }}
          >
            {h.sub}
          </p>
          <div className="fade-up mt-8" style={{ animationDelay: '240ms' }}>
            <PillButton onClick={dive} icon={ArrowDown}>
              {h.cta}
            </PillButton>
          </div>
          <div
            className="fade-up mt-8 flex flex-wrap justify-center gap-2"
            style={{ animationDelay: '320ms' }}
          >
            {h.pills.map((p) => (
              <Link
                key={p}
                to="/tjenester"
                className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80 transition-transform hover:scale-105"
              >
                {p}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Label>{h.quoteLabel}</Label>
          <p className="mt-3 text-lg leading-snug text-white lg:text-xl">
            “{h.quote[0]} <span className="serif-italic">{h.quote[1]}</span>”
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-xs tracking-widest text-white/60">
            <span className="h-px w-10 bg-white/30" />
            ASPECTO
            <span className="h-px w-10 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Right panel, desktop only */}
      <div className="hidden w-[48%] flex-col lg:flex">
        <div className="flex items-center justify-between">
          <a
            href="mailto:post@aspecto.no"
            className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-2 pr-4 text-sm text-white transition-transform hover:scale-105"
          >
            <IconDot>
              <Mail className="h-4 w-4" />
            </IconDot>
            post@aspecto.no
            <ArrowRight className="h-4 w-4 text-white/60" />
          </a>
          <Link
            to="/karriere"
            className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm transition-transform hover:scale-105 active:scale-95"
          >
            {h.hiring}
            <IconDot>
              <Sparkles className="h-4 w-4" />
            </IconDot>
          </Link>
        </div>

        <Glass tilt className="mt-8 w-56 self-end rounded-3xl p-5">
          <h3 className="text-base">{h.cardTitle}</h3>
          <p className="mt-2 text-xs leading-relaxed text-white/60">{h.cardText}</p>
        </Glass>

        <div className="liquid-glass mt-auto rounded-[2.5rem] p-4">
          <div className="grid grid-cols-2 gap-4">
            {[Waves, Radar].map((Icon, i) => (
              <Glass key={i} tilt className="rounded-3xl p-5">
                <IconDot>
                  <Icon className="h-4 w-4" />
                </IconDot>
                <h3 className="mt-6 text-lg">{h.useCases[i].title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">{h.useCases[i].text}</p>
              </Glass>
            ))}
          </div>
          <Glass className="mt-4 flex items-center gap-4 rounded-3xl p-4">
            <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <LifeBuoy className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div className="flex-1">
              <h3 className="text-base">{h.useCases[2].title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/60">{h.useCases[2].text}</p>
            </div>
            <Link
              to="/tjenester"
              aria-label={t.servicesIntro.all}
              className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
            </Link>
          </Glass>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useLang()

  return (
    <div className="lg:pr-16">
      <DepthMeter />
      <Hero />

      <Section id="dive" className="scroll-mt-24">
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Label>{t.about.label}</Label>
            <Title
              parts={t.about.title}
              className="mt-4 text-5xl leading-[1.05] tracking-[-0.05em] lg:text-7xl"
            />
            <p className="serif-italic mt-6 text-2xl leading-snug">{t.about.lead}</p>
          </Reveal>
          <Reveal delay={120}>
            <Glass strong className="rounded-3xl p-7 lg:p-9">
              <p className="text-base leading-relaxed text-white/80">{t.about.text}</p>
              <PillButton to="/omoss" className="mt-7">
                {t.about.more}
              </PillButton>
            </Glass>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>{t.servicesIntro.label}</Label>
            <Title
              parts={t.servicesIntro.title}
              className="mt-4 text-5xl leading-[1.05] tracking-[-0.05em] lg:text-6xl"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              {t.servicesIntro.text}
            </p>
          </div>
          <PillButton to="/tjenester">{t.servicesIntro.all}</PillButton>
        </Reveal>
        <Reveal delay={100}>
          <ServiceExplorer />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Glass strong className="rounded-[2.5rem] p-8 lg:p-14">
            <Label>{t.testimonial.label}</Label>
            <blockquote className="mt-6 text-2xl leading-snug tracking-[-0.02em] lg:text-4xl">
              “{t.testimonial.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
              <span className="h-px w-10 bg-white/30" />
              {t.testimonial.author}
            </div>
          </Glass>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>{t.news.label}</Label>
            <Title
              parts={t.news.title}
              stacked
              className="mt-4 text-4xl leading-[1.08] tracking-[-0.05em] lg:text-6xl"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">{t.news.text}</p>
          </div>
          <PillButton to="/nyheter">{t.news.all}</PillButton>
        </Reveal>
        <NewsCards />
      </Section>

      <CtaBand />
    </div>
  )
}
