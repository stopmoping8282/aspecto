import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

const MAX_DEPTH = 400 // metres at the bottom of the page

/** Fixed gauge that counts metres as you scroll down the page. */
export default function DepthMeter() {
  const { t } = useLang()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const depth = Math.round(progress * MAX_DEPTH)
  const zone = depth < 5 ? 0 : depth < 200 ? 1 : depth < 390 ? 2 : 3

  return (
    <>
      {/* Desktop: vertical gauge on the right edge */}
      <div
        className="liquid-glass-strong fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full px-3 py-5 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">{t.depthLabel}</span>
        <div className="relative h-44 w-6">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/20" />
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`absolute left-1/2 h-px -translate-x-1/2 bg-white/40 ${i % 2 ? 'w-2' : 'w-4'}`}
              style={{ top: `${(i / 8) * 100}%` }}
            />
          ))}
          <span
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{ top: `${progress * 100}%` }}
          />
        </div>
        <span className="w-12 text-center text-sm tabular-nums">{depth} m</span>
        <span className="serif-italic h-28 text-sm [writing-mode:vertical-rl]">{t.zones[zone]}</span>
      </div>

      {/* Mobile: small pill */}
      <div
        className="liquid-glass-strong fixed bottom-4 right-4 z-30 rounded-full px-3.5 py-2 text-xs tabular-nums lg:hidden"
        aria-hidden="true"
      >
        ↓ {depth} m
      </div>
    </>
  )
}
