import { createContext, useContext, useEffect, useState } from 'react'
import { content } from './content'

const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('aspecto-lang')
    if (saved === 'no' || saved === 'en') return saved
  } catch {}
  return 'no'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('aspecto-lang', lang)
    } catch {}
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
