import { useState } from 'react'
import { FileCheck, Map, Scale } from 'lucide-react'
import { useLang } from '../i18n'
import { Glass, IconDot } from './ui'

const ICONS = [Scale, FileCheck, Map]

/**
 * Click a service on the left and the glass panel on the right changes.
 * `detailed` shows the full description of every sub-service (used on the Services page).
 */
export default function ServiceExplorer({ detailed = false }) {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const service = t.services[active]

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="flex flex-col gap-3" role="tablist" aria-label={t.servicesIntro.hint}>
        {t.services.map((s, i) => {
          const Icon = ICONS[i]
          const selected = i === active
          return (
            <Glass
              as="button"
              key={s.short}
              type="button"
              role="tab"
              id={`service-tab-${i}`}
              aria-selected={selected}
              aria-controls="service-panel"
              strong={selected}
              onClick={() => setActive(i)}
              className={`flex items-center gap-4 rounded-3xl p-5 text-left transition-all duration-300 hover:scale-[1.02] ${
                selected ? 'text-black' : 'text-black/60 hover:text-black'
              }`}
            >
              <span className="serif-italic w-8 text-3xl">{i + 1}</span>
              <span className="flex-1">
                <span className="block text-xs uppercase tracking-widest text-black/50">{s.short}</span>
                <span className="mt-1 block text-base leading-snug">{s.title}</span>
              </span>
              <IconDot className={selected ? 'bg-black/20' : ''}>
                <Icon className="h-4 w-4" />
              </IconDot>
            </Glass>
          )
        })}
      </div>

      <Glass
        strong
        role="tabpanel"
        id="service-panel"
        aria-labelledby={`service-tab-${active}`}
        className="rounded-[2.5rem] p-7 lg:p-10"
      >
        {/* key restarts the fade animation each time the service changes */}
        <div key={active} className="fade-up">
          <p className="text-xs uppercase tracking-widest text-black/50">
            {String(active + 1).padStart(2, '0')} / {String(t.services.length).padStart(2, '0')}
          </p>
          <h3 className="mt-3 text-3xl leading-tight lg:text-4xl">
            {detailed ? service.pageTitle : service.title}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-black/80 lg:text-base">{service.text}</p>

          {detailed ? (
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.items.map(([title, text]) => (
                <div key={title} className="liquid-glass rounded-3xl p-5">
                  <dt className="text-sm font-medium text-black">{title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-black/60">{text}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <ul className="mt-7 flex flex-wrap gap-2">
              {service.items.map(([title]) => (
                <li key={title} className="liquid-glass rounded-full px-4 py-2 text-xs text-black/80">
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Glass>
    </div>
  )
}
