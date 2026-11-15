import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, MapPin } from 'lucide-react'
import { useLang } from '../i18n'
import { ORIGINAL_SITE } from '../content'
import { ContactForm, useContactModal } from '../components/Contact'
import { FleetCards, Workflow } from '../components/Industry'
import { PageHeader } from '../components/Layout'
import ServiceExplorer from '../components/ServiceExplorer'
import { CtaBand, NewsCards, Newsletter, PillButton, Section, TeamGrid } from '../components/Sections'
import { Glass, Label, Reveal, Title } from '../components/ui'

export function About() {
  const { t } = useLang()
  const a = t.aboutPage
  return (
    <>
      <PageHeader label={a.label} title={a.title} intro={a.intro} />

      <Section className="!pt-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {a.blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <Glass tilt className="h-full rounded-3xl p-7">
                <span className="serif-italic text-3xl">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-5 text-2xl">{b.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/80">{b.text}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Title parts={a.dataTitle} className="text-4xl lg:text-6xl" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80">{a.dataText}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="liquid-glass mt-10 grid gap-4 rounded-[2.5rem] p-4 md:grid-cols-3">
            {a.pillars.map((p) => (
              <Glass key={p.title} className="rounded-3xl p-6">
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</p>
              </Glass>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Title parts={t.strengths.title} className="text-4xl lg:text-6xl" />
          <p className="mt-5 max-w-3xl text-xl font-light leading-snug text-white/70">{t.strengths.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Glass strong className="h-full rounded-3xl p-7">
              <CheckList items={t.strengths.items} />
            </Glass>
          </Reveal>
          <Reveal delay={100}>
            <Glass className="h-full rounded-3xl p-7">
              <h3 className="mb-4 text-xs uppercase tracking-widest text-white/50">{t.strengths.chainTitle}</h3>
              <CheckList items={t.strengths.chain} />
            </Glass>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Glass strong className="rounded-[2.5rem] p-8 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-14 lg:p-12">
            <div>
              <Label>{t.science.label}</Label>
              <h2 className="mt-4 text-4xl leading-none lg:text-5xl">{t.science.name}</h2>
              <p className="mt-4 text-sm text-white/60">{t.science.role}</p>
            </div>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-white/80 lg:mt-0">
              {t.science.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Glass>
        </Reveal>
      </Section>

      <Section>
        <TeamGrid />
      </Section>

      <CtaBand />
    </>
  )
}

function CheckList({ items }) {
  return (
    <ul className="flex flex-col gap-3 text-sm leading-relaxed text-white/85">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-white/50" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Services() {
  const { t } = useLang()
  const s = t.servicesPage
  return (
    <>
      <PageHeader label={s.label} title={s.title} intro={s.intro} />
      <Section className="!pt-6">
        <Reveal>
          <ServiceExplorer detailed />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Title parts={t.products.title} className="text-4xl lg:text-6xl" />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {t.products.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <Glass strong={i === 0} className="h-full rounded-3xl p-7">
                <h3 className="mb-5 text-xl">{g.title}</h3>
                <CheckList items={g.items} />
                {g.note && <p className="mt-6 text-sm text-white/60">{g.note}</p>}
              </Glass>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Title parts={t.auvBenefits.title} stacked className="text-4xl leading-[1.05] lg:text-6xl" />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <Glass strong className="h-full rounded-3xl p-7">
              <CheckList items={t.auvBenefits.items} />
            </Glass>
          </Reveal>
          <Reveal delay={100}>
            <FleetCards />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Title parts={t.workflow.title} stacked className="text-4xl leading-[1.05] lg:text-6xl" />
          <p className="mt-4 text-sm text-white/60">{t.workflow.total}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <Workflow />
        </Reveal>
      </Section>
      <CtaBand title={s.ctaTitle} text={s.ctaText} />
    </>
  )
}

export function News() {
  const { t } = useLang()
  return (
    <>
      <PageHeader label={t.news.label} title={t.news.title} intro={t.news.text} />
      <Section className="!pt-6">
        <NewsCards />
        <div className="mt-4">
          <Newsletter />
        </div>
      </Section>
      <CtaBand />
    </>
  )
}

export function Careers() {
  const { t } = useLang()
  const c = t.careers
  const openContact = useContactModal()
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHeader label={c.label} title={c.title} intro={c.intro} />

      <Section className="!pt-6">
        <Reveal>
          <Glass strong className="rounded-[2.5rem] p-8 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-12">
            <div>
              <Title parts={c.subTitle} stacked className="text-4xl leading-[1.08] lg:text-5xl" />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">{c.subText}</p>
            </div>
            <PillButton onClick={openContact} className="mt-7 shrink-0 lg:mt-0">
              {c.apply}
            </PillButton>
          </Glass>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <h2 className="text-4xl lg:text-5xl">{c.openTitle}</h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-3">
          {c.jobs.map((job, i) => {
            const isOpen = open === i
            return (
              <Reveal key={job.title} delay={i * 80}>
                <Glass strong={isOpen} className="rounded-3xl">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`job-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-5 p-6 text-left"
                    >
                      <span className="serif-italic w-10 text-3xl">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-2xl tracking-[-0.03em]">{job.title}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </button>
                  </h3>
                  {isOpen && (
                    <div id={`job-${i}`} className="fade-up px-6 pb-6 sm:pl-[5.25rem]">
                      <p className="max-w-2xl text-base leading-relaxed text-white/80">{job.text}</p>
                      <p className="mt-4 flex max-w-2xl items-start gap-2 text-sm text-white/60">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {c.location}
                      </p>
                      <a
                        href={`${ORIGINAL_SITE}/karriere`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white transition-colors hover:text-white/80"
                      >
                        {c.more} <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </Glass>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </>
  )
}

export function Contact() {
  const { t } = useLang()
  const c = t.contact
  return (
    <>
      <PageHeader label={c.label} title={c.title} intro={c.text} />

      <Section className="!pt-6">
        <Reveal>
          <Glass strong className="rounded-[2.5rem] p-7 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-12 lg:p-12">
            <div className="mb-8 lg:mb-0">
              <Label>{c.label}</Label>
              <Title parts={c.modalTitle} stacked className="mt-4 text-4xl leading-[1.08] lg:text-5xl" />
              <p className="mt-5 text-sm leading-relaxed text-white/60">{c.formHint}</p>
              <div className="mt-8 text-sm text-white/80">
                {t.footer.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a
                  href="mailto:post@aspecto.no"
                  className="mt-3 inline-block text-white transition-colors hover:text-white/80"
                >
                  post@aspecto.no
                </a>
              </div>
            </div>
            <ContactForm />
          </Glass>
        </Reveal>
      </Section>

      <Section>
        <TeamGrid />
      </Section>
    </>
  )
}
