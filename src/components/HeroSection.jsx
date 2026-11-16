import { useState } from 'react'
import BookCourtButton from './BookCourtButton'
import { useLang } from '../context/LanguageContext'
import { club } from '../data/clubData'

export default function HeroSection() {
  const [imgFailed, setImgFailed] = useState(false)
  const { t } = useLang()

  return (
    <section id="home" className="bg-white pb-6 pt-20 sm:pt-24">
      <div className="relative mx-3 flex min-h-[75vh] items-center overflow-hidden rounded-[2rem] bg-night shadow-xl sm:mx-5 sm:rounded-[2.5rem] lg:mx-8 lg:rounded-[3rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-night via-[#2b1a10] to-night" />

        {!imgFailed && (
          <img
            src="/images/hero.jpg"
            alt="Tennis courts at Nyarutarama Tennis Club"
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/60 to-night/20" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-flame/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-ball/10 blur-3xl" />

        <div className="relative w-full px-6 py-14 sm:px-10 lg:px-16">
          
          <h1 className="max-w-2xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t('hero.welcome')} <span className="text-flame">{club.name}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/85">{t('hero.text')}</p>
          <p className="mt-3 max-w-lg text-sm font-medium italic text-ball/90">{t('hero.tagline')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookCourtButton className="rounded-full bg-ball px-6 py-3 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ball/30" />
            <a
              href="#about"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-flame hover:text-flame"
            >
              {t('hero.learnMore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}