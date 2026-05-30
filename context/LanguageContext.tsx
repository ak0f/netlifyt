'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Lang, type T } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  t: T
  setLang: (l: Lang) => void
  ready: boolean          // false until localStorage + IP check done
  showModal: boolean      // true on genuine first visit
  confirmLang: (l: Lang) => void
}

const Ctx = createContext<LangCtx | null>(null)

const DACH = ['CH', 'DE', 'AT', 'LI']
const STORAGE_KEY = 'slide_lang'

async function detectLangFromIP(): Promise<Lang> {
  try {
    const res = await fetch('https://ipapi.co/country_code/', { cache: 'no-store' })
    const code = (await res.text()).trim().toUpperCase()
    return DACH.includes(code) ? 'de' : 'en'
  } catch {
    return 'de'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de')
  const [ready, setReady]     = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null

    if (stored === 'de' || stored === 'en') {
      /* returning visitor: just use their preference */
      setLangState(stored)
      setReady(true)
    } else {
      /* first ever visit: detect via IP then show modal */
      detectLangFromIP().then(detected => {
        setLangState(detected)   // pre-select the detected language
        setReady(true)
        setShowModal(true)
      })
    }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }

  function confirmLang(l: Lang) {
    setLang(l)
    setShowModal(false)
  }

  return (
    <Ctx.Provider value={{ lang, t: translations[lang], setLang, ready, showModal, confirmLang }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
