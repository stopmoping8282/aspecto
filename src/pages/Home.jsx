import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, Check, LifeBuoy, Radar, Waves } from 'lucide-react'
import { useLang } from '../i18n'
import DepthMeter from '../components/DepthMeter'
import { DepthChart } from '../components/Graphics'
import IndustryModal, { FleetCards } from '../components/Industry'
import { EASE } from '../components/Layout'
import ServiceExplorer from '../components/ServiceExplorer'
import { CtaBand, NewsCards, PillButton, Section } from '../components/Sections'
import { Glass, IconDot, Label, Reveal, Title } from '../components/ui'

const SURVEY_IMAGES = [
  ['/img/seabed-lights.jpg', 'seabed'],
  ['/img/stereo-camera.jpg', 'camera'],
  ['/img/vessel-aerial.jpg', 'vessel'],
]

const rise = (y, delay, duration = 0.8) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: EASE },
})

/** Full-screen hero: content pinned to the bottom over a dark gradient. */
function Hero({ onIndustry }) {
  const { t } = useLang()
  const h = t.heroNew
  const dive = () => document.getElementById('dive')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative flex min-h-screen flex-col justify-end">
      <motion.div
        {...rise(20, 0.5, 1)}
        className="flex flex-col gap-8 bg-gradient-to-t from-white via-white/70 to-transparent px-4 pb-8 pt-40 md:flex-row md:items-end md:justify-between md:px-8 md:pb-10"
      >
        <div>
          <motion.p {...rise(16, 0.6)} className="flex items-center gap-2.5 text-[13px] text-black/70">
            <span className="h-2 w-2 rounded-full bg-black" />
            {t.brand.line}
          </motion.p>

          <motion.h1
            {...rise(20, 0.8)}
            className="mt-5 text-[clamp(2rem,8vw,4.5rem)] leading-none md:text-[clamp(2.5rem,5.5vw,4.5rem)]"
          >
            {h.title[0]}
            <br />
            {h.title[1]}
          </motion.h1>

          <motion.div {...rise(16, 1)} className="mt-7">
            <p className="mb-3 text-[11px] uppercase tracking-widest text-black/50">{h.prompt}</p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onIndustry('aqua')}
                className="rounded-full bg-black px-5 py-3 text-[13px] font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                {t.industries.aqua.name}
              </button>
              <button
                type="button"
                onClick={() => onIndustry('oil')}
                className="rounded-full px-5 py-3 text-[13px] font-medium text-black ring-1 ring-inset ring-black/45 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
              >
                {t.industries.oil.name}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div {...rise(16, 1.1)} className="flex flex-col gap-4 md:items-end lg:pr-16">
          <div className="flex flex-wrap gap-2">
            {t.survey.items.map((item) => (
              <span
                key={item.title}
                className="rounded-full bg-black/10 px-3.5 py-2 text-[11px] text-black/85 ring-1 ring-inset ring-black/20 backdrop-blur-sm"
              >
                {item.title}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={dive}
            className="inline-flex items-center gap-2 text-[13px] text-black/70 transition-colors hover:text-black"
          >
            {h.scroll} <ArrowDown className="bob h-3.5 w-3.5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function Home() {
  const { t } = useLang()
  const [industry, setIndustry] = useState(null)
  const closeIndustry = useCallback(() => setIndustry(null), [])

  return (
    <>
      <Hero onIndustry={setIndustry} />
      <IndustryModal industry={industry} onChange={setIndustry} onClose={closeIndustry} />

      <div className="lg:pr-16">
        <DepthMeter />

        <Section id="dive" className="scroll-mt-24">
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Label>{t.about.label}</Label>
              <Title parts={t.about.title} className="mt-4 text-5xl leading-none lg:text-7xl" />
              <p className="mt-6 text-2xl font-light leading-snug text-black/70">{t.about.lead}</p>
              <img
                src="/img/crew-auv.jpg"
                alt={t.images.crew}
                loading="lazy"
                className="mt-8 aspect-[16/10] w-full rounded-3xl object-cover"
              />
            </Reveal>
            <Reveal delay={120}>
              <Glass strong className="rounded-3xl p-7 lg:p-9">
                <p className="text-base leading-relaxed text-black/80">{t.about.text}</p>
                <PillButton to="/omoss" className="mt-7">
                  {t.about.more}
                </PillButton>
              </Glass>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <Label>{t.survey.label}</Label>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[Waves, Radar, LifeBuoy].map((Icon, i) => (
                <Glass key={i} tilt className="rounded-3xl p-6">
                  <img
                    src={SURVEY_IMAGES[i][0]}
                    alt={t.images[SURVEY_IMAGES[i][1]]}
                    loading="lazy"
                    className="mb-6 aspect-[16/10] w-full rounded-2xl object-cover"
                  />
                  <IconDot>
                    <Icon className="h-4 w-4" />
                  </IconDot>
                  <h3 className="mt-4 text-2xl">{t.survey.items[i].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{t.survey.items[i].text}</p>
                </Glass>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section>
          <Reveal className="mb-10">
            <Label>{t.fleet.label}</Label>
            <Title parts={t.fleet.title} stacked className="mt-4 text-4xl leading-none lg:text-6xl" />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-black/80">{t.fleet.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <img
                src="/img/auv.jpg"
                alt={t.images.auv}
                loading="lazy"
                className="h-full max-h-96 w-full rounded-3xl object-cover"
              />
              <Glass className="flex items-center rounded-3xl p-5">
                <DepthChart />
              </Glass>
            </div>
            <FleetCards />
          </Reveal>
        </Section>

        <Section>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label>{t.servicesIntro.label}</Label>
              <Title parts={t.servicesIntro.title} className="mt-4 text-5xl leading-none lg:text-6xl" />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/80">
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
            <Glass strong className="rounded-[2.5rem] p-8 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-14 lg:p-14">
              <div>
                <Label>{t.artskart.label}</Label>
                <Title parts={t.artskart.title} stacked className="mt-4 text-4xl leading-none lg:text-5xl" />
                <p className="mt-8 text-7xl font-light tracking-[-0.04em] lg:text-8xl">{t.artskart.stat}</p>
                <p className="mt-2 max-w-xs text-sm text-black/60">{t.artskart.statLabel}</p>
              </div>
              <div className="mt-8 lg:mt-0 lg:self-end">
                <p className="text-base leading-relaxed text-black/80">{t.artskart.text}</p>
                <ul className="mt-6 flex flex-col gap-2.5 text-sm text-black/85">
                  {t.artskart.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/50" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Glass>
          </Reveal>
        </Section>

        <Section>
          <Reveal>
            <Label>{t.testimonial.label}</Label>
            <blockquote className="mt-6 max-w-5xl text-2xl font-light leading-snug tracking-[-0.02em] lg:text-4xl">
              “{t.testimonial.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-black/60">
              <span className="h-px w-10 bg-black/30" />
              {t.testimonial.author}
            </div>
          </Reveal>
        </Section>

        <Section>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label>{t.news.label}</Label>
              <Title parts={t.news.title} stacked className="mt-4 text-4xl leading-[1.05] lg:text-6xl" />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/80">{t.news.text}</p>
            </div>
            <PillButton to="/nyheter">{t.news.all}</PillButton>
          </Reveal>
          <NewsCards />
        </Section>

        <CtaBand />
      </div>
    </>
  )
}
