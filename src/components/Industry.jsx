import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, BarChart3, Check, ClipboardCheck, Database, Map, Send, Ship, X } from 'lucide-react'
import { useLang } from '../i18n'
import { fleet, workflowDays } from '../content'
import { useContactModal } from './Contact'
import { EASE } from './Layout'

const STEP_ICONS = [Map, Ship, Database, BarChart3, ClipboardCheck, Send]

/** Six-step SNIS timeline from the presentation. */
export function Workflow() {
  const { t } = useLang()
  const w = t.workflow
  return (
    <div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {w.steps.map((step, i) => (
          <li key={step} className="liquid-glass rounded-2xl p-4">
            <StepIcon i={i} />
            <p className="mt-3 text-sm text-black">
              <span className="mr-1.5 text-[11px] text-black/40">{String(i + 1).padStart(2, '0')}</span>
              {step}
            </p>
            <p className="mt-1 text-xs text-black/55">
              {workflowDays[i] ? `${workflowDays[i]} ${w.days}` : w.total}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function StepIcon({ i }) {
  const Icon = STEP_ICONS[i]
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
      <Icon className="h-4 w-4" />
    </span>
  )
}

/** The three AUVs with their specs. */
export function FleetCards({ compact = false }) {
  const { t } = useLang()
  const f = t.fleet
  return (
    <div className={`grid gap-3 ${compact ? 'sm:grid-cols-3' : 'gap-4 md:grid-cols-3'}`}>
      {fleet.map((v) => (
        <div key={v.id} className={`liquid-glass rounded-3xl ${compact ? 'p-4' : 'p-6'}`}>
          <p className="text-[11px] tracking-widest text-black/50">{v.id}</p>
          <p className={`mt-1 font-light tracking-[-0.03em] ${compact ? 'text-2xl' : 'text-4xl'}`}>
            {v.name}
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-black/10" aria-hidden="true">
            <div className="h-full rounded-full bg-black" style={{ width: `${(v.depth / 600) * 100}%` }} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            <dt className="text-black/50">{f.depth}</dt>
            <dd className="text-right tabular-nums">{v.depth} m</dd>
            <dt className="text-black/50">{f.endurance}</dt>
            <dd className="text-right tabular-nums">
              {v.hours} {f.hours}
            </dd>
            {!compact && (
              <>
                <dt className="text-black/50">{f.camera}</dt>
                <dd className="text-right">{v.camera}</dd>
                <dt className="text-black/50">{f.speed}</dt>
                <dd className="text-right tabular-nums">{v.speed}</dd>
              </>
            )}
          </dl>
        </div>
      ))}
    </div>
  )
}

/** Pop-up with information tailored to one industry: 'aqua' or 'oil'. */
export default function IndustryModal({ industry, onChange, onClose }) {
  const { t } = useLang()
  const openContact = useContactModal()
  const ind = t.industries
  const data = industry ? ind[industry] : null

  useEffect(() => {
    if (!industry) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [industry, onClose])

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={data.name}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass-strong max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white/90 p-5 sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex rounded-full bg-black/10 p-1 text-[13px]" role="tablist" aria-label={ind.switchLabel}>
                {['aqua', 'oil'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={industry === key}
                    onClick={() => onChange(key)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      industry === key ? 'bg-black text-white' : 'text-black/70 hover:text-black'
                    }`}
                  >
                    {ind[key].name}
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label={t.contact.close}
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 transition-transform hover:scale-105"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* key restarts the entrance animation when switching industry */}
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <img
                src={industry === 'aqua' ? '/img/crew-auv.jpg' : '/img/seabed-lights.jpg'}
                alt={industry === 'aqua' ? t.images.crew : t.images.seabed}
                className="mt-5 h-40 w-full rounded-2xl object-cover sm:h-52"
              />
              <h2 className="mt-7 text-3xl leading-[1.05] sm:text-5xl">
                {data.title[0]}
                <br />
                <em>{data.title[1]}</em>
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/80 sm:text-base">{data.intro}</p>

              <dl className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                {data.stats.map(([value, label]) => (
                  <div key={label} className="liquid-glass rounded-2xl p-3 sm:p-5">
                    <dt className="text-2xl font-light tracking-[-0.03em] sm:text-4xl">{value}</dt>
                    <dd className="mt-1.5 text-[11px] leading-snug text-black/60 sm:text-xs">{label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {data.lists.map((list) => (
                  <div key={list.title}>
                    <h3 className="text-xs uppercase tracking-widest text-black/50">{list.title}</h3>
                    <ul className="mt-3 flex flex-col gap-2 text-sm text-black/85">
                      {list.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="mb-3 text-xs uppercase tracking-widest text-black/50">
                  {industry === 'aqua' ? t.workflow.title.join(' ') : t.fleet.title.join(' ')}
                </h3>
                {industry === 'aqua' ? <Workflow /> : <FleetCards compact />}
              </div>

              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-widest text-black/50">{data.extraTitle}</h3>
                <ol className="mt-3 grid gap-2 text-sm text-black/85 sm:grid-cols-2">
                  {data.extra.map((item, i) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[11px] leading-5 text-black/40">{String(i + 1).padStart(2, '0')}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose()
                  openContact()
                }}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-black py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                {ind.cta}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
