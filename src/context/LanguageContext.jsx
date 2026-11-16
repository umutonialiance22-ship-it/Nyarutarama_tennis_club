import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext(null)
const LOCALES = { en: 'en-GB', fr: 'fr-FR' }

function initialLang() {
  try {
    const saved = localStorage.getItem('lang') // just a language choice, nothing sensitive
    if (saved === 'en' || saved === 'fr') return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  // t('court.n', { n: 2 }) -> "Court 2" / "Terrain 2"
  const t = useCallback(
    (key, vars) => {
      let text = translations[lang][key] ?? translations.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v))
      }
      return text
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t, locale: LOCALES[lang] }), [lang, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}