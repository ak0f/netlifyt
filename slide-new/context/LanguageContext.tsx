'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Lang, type T } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  t: T
  setLang: (l: Lang) => void
  ready: boolean          // false until language is detected
}

const Ctx = createContext<LangCtx | null>(null)

const STORAGE_KEY = 'slide_lang'

/** Detect German vs English from the browser locale. Defaults to German. */
function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'de'
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const loc of locales) {
    const code = loc?.toLowerCase() ?? ''
    if (code.startsWith('de')) return 'de'
    if (code.startsWith('en')) return 'en'
  }
  return 'de'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de')
  const [ready, setReady]    = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null

    if (stored === 'de' || stored === 'en') {
      /* returning visitor: respect their manual choice */
      setLangState(stored)
    } else {
      /* first visit: auto-detect from the browser language */
      setLangState(detectLang())
    }
    setReady(true)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }

  return (
    <Ctx.Provider value={{ lang, t: translations[lang], setLang, ready }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
