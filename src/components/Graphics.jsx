import { useLang } from '../i18n'
import { fleet } from '../content'

/** Simple drawing: how deep each of the three AUVs can go. */
export function DepthChart({ className = '' }) {
  const { t } = useLang()
  const y = (d) => 40 + d * 0.42 // 0 m at the surface line, 600 m near the bottom
  const xs = [170, 290, 410]

  return (
    <svg viewBox="0 0 480 330" className={`w-full text-black ${className}`} role="img" aria-label={t.diagram.depthAlt}>
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect x="70" y={y(0)} width="400" height={y(600) - y(0) + 14} rx="14" fill="url(#sea)" />
      {/* surface */}
      <path
        d={`M70 ${y(0)} q12 -7 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text x="70" y="22" fontSize="11" fill="currentColor" opacity="0.6">
        {t.diagram.surface}
      </text>
      {/* depth scale */}
      {[0, 100, 200, 300, 400, 500, 600].map((d) => (
        <g key={d}>
          <line x1="70" x2="470" y1={y(d)} y2={y(d)} stroke="currentColor" strokeOpacity={d ? 0.1 : 0} />
          <text x="60" y={y(d) + 4} fontSize="11" textAnchor="end" fill="currentColor" opacity="0.6">
            {d} m
          </text>
        </g>
      ))}
      {fleet.map((v, i) => (
        <g key={v.id}>
          <line x1={xs[i]} x2={xs[i]} y1={y(0) + 4} y2={y(v.depth) - 10} stroke="currentColor" strokeDasharray="3 4" strokeOpacity="0.5" />
          {/* AUV */}
          <rect x={xs[i] - 26} y={y(v.depth) - 8} width="52" height="16" rx="8" fill="currentColor" />
          <rect x={xs[i] + 24} y={y(v.depth) - 5} width="7" height="10" rx="2" fill="currentColor" />
          <circle cx={xs[i] - 16} cy={y(v.depth)} r="3" fill="#fff" />
          <text x={xs[i]} y={y(v.depth) + 26} fontSize="13" textAnchor="middle" fill="currentColor">
            {v.name}
          </text>
          <text x={xs[i]} y={y(v.depth) - 16} fontSize="11" textAnchor="middle" fill="currentColor" opacity="0.6">
            {v.depth} m · {v.hours} {t.diagram.hoursShort}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** Simple top-down drawing: straight AUV transects covering the area around a fish farm. */
export function TransectDiagram({ className = '' }) {
  const { t } = useLang()
  const rows = [60, 92, 124, 156, 188, 220]
  let path = ''
  rows.forEach((yy, i) => {
    const [a, b] = i % 2 ? [420, 60] : [60, 420]
    path += `${i ? 'L' : 'M'}${a} ${yy} L${b} ${yy} `
  })

  return (
    <svg viewBox="0 0 480 290" className={`w-full text-black ${className}`} role="img" aria-label={t.diagram.transectAlt}>
      <rect x="40" y="40" width="400" height="200" rx="18" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="5 5" />
      <text x="40" y="28" fontSize="11" fill="currentColor" opacity="0.6">
        {t.diagram.area}
      </text>
      {/* fish farm: two rows of cages */}
      {[0, 1, 2, 3].map((i) =>
        [0, 1].map((j) => (
          <circle key={`${i}${j}`} cx={165 + i * 50} cy={118 + j * 46} r="19" fill="#fff" stroke="currentColor" strokeWidth="1.5" />
        )),
      )}
      <text x="240" y="268" fontSize="11" textAnchor="middle" fill="currentColor" opacity="0.6">
        {t.diagram.farm}
      </text>
      {/* transects */}
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* AUV at the end of the path */}
      <rect x="48" y="213" width="26" height="14" rx="7" fill="currentColor" />
      <text x="440" y="28" fontSize="11" textAnchor="end" fill="currentColor">
        {t.diagram.transects}
      </text>
    </svg>
  )
}
