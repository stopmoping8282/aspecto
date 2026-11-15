import { createContext, useContext, useEffect, useState } from 'react'
import { Check, Send, X } from 'lucide-react'
import { useLang } from '../i18n'
import { Title } from './ui'

const ContactContext = createContext(() => {})
export const useContactModal = () => useContext(ContactContext)

/** The consultation form. Not connected to email yet: it only shows a thank-you state. */
export function ContactForm() {
  const { t } = useLang()
  const c = t.contact
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="fade-up flex flex-col items-center gap-4 py-10 text-center" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-2xl">{c.thanksTitle}</h3>
        <p className="text-sm text-white/60">{c.thanksText}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
        >
          {c.again}
        </button>
      </div>
    )
  }

  const field = (name, label, props = {}) => (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
        {label}
        {props.required && ' *'}
      </span>
      <input name={name} className="field" {...props} />
    </label>
  )

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      {field('first', c.fields.first, { required: true, autoComplete: 'given-name' })}
      {field('last', c.fields.last, { required: true, autoComplete: 'family-name' })}
      {field('email', c.fields.email, { required: true, type: 'email', autoComplete: 'email' })}
      {field('phone', c.fields.phone, { type: 'tel', autoComplete: 'tel' })}
      <div className="sm:col-span-2">{field('company', c.fields.company, { autoComplete: 'organization' })}</div>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
          {c.fields.message} *
        </span>
        <textarea name="message" required rows={4} className="field resize-none" />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="liquid-glass-strong inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm transition-transform hover:scale-105 active:scale-95"
        >
          {c.send}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <Send className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </form>
  )
}

export function ContactProvider({ children }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <ContactContext.Provider value={() => setOpen(true)}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.contact.modalTitle.join(' ')}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass-strong fade-up max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl p-6 sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <Title as="h2" parts={t.contact.modalTitle} className="text-3xl sm:text-4xl" />
                <p className="mt-2 text-sm text-white/60">{t.contact.formHint}</p>
              </div>
              <button
                type="button"
                aria-label={t.contact.close}
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-105"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ContactForm />
          </div>
        </div>
      )}
    </ContactContext.Provider>
  )
}
