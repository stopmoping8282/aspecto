import { useEffect, useRef } from 'react'

/** Fades and slides its children in when they scroll into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

/** Glass card with a highlight that follows the cursor, and an optional 3D tilt. */
export function Glass({ as: Tag = 'div', strong = false, tilt = false, className = '', children, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (tilt) {
      el.style.setProperty('--ry', `${(x / r.width - 0.5) * 6}deg`)
      el.style.setProperty('--rx', `${(0.5 - y / r.height) * 6}deg`)
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (!el || !tilt) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${strong ? 'liquid-glass-strong' : 'liquid-glass'} glow ${tilt ? 'tilt' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Heading whose second part is set in the serif italic accent. */
export function Title({ as: Tag = 'h2', parts, className = '', stacked = false }) {
  return (
    <Tag className={className}>
      {parts[0]}
      {stacked ? <br /> : ' '}
      <em>{parts[1]}</em>
    </Tag>
  )
}

export function Label({ children, className = '' }) {
  return (
    <p className={`text-xs uppercase tracking-widest text-white/50 ${className}`}>{children}</p>
  )
}

export function IconDot({ children, className = '' }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 ${className}`}
    >
      {children}
    </span>
  )
}
