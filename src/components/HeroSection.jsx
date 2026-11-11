import { useState } from 'react'
import { Link } from 'react-router-dom'
import { club } from '../data/clubData'

export default function HeroSection() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-night pt-16">
      {/* Fallback background (shows if the photo is missing) */}
      <div className="absolute inset-0 bg-gradient-to-br from-night via-[#2b1a10] to-night" />

      {/* Hero photo */}
      {!imgFailed && (
        <img
          src="/images/hero.jpg"
          alt="Tennis courts at Nyarutarama Tennis Club"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark overlay so the text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/65 to-night/30" />
      <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-flame/25 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-ball/10 blur-3xl" />

      {imgFailed && (
        <span className="absolute bottom-4 right-4 rounded bg-black/30 px-2 py-1 text-[10px] uppercase tracking-widest text-white/50">
          Hero photo placeholder
        </span>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="mb-5 inline-block rounded-full border border-ball/50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-ball">
          Kigali, Rwanda
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          Welcome to <span className="text-flame">Nyarutarama</span> Tennis Club
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Great courts, a friendly community and expert coaching. Whether you are picking up a racket
          for the first time or training for your next match, there is a place for you here.
        </p>
        <p className="mt-4 max-w-xl font-medium italic text-ball/90">{club.tagline}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/book"
            className="rounded-full bg-ball px-8 py-3.5 font-semibold text-night transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ball/30"
          >
            Book a Court
          </Link>
          <a
            href="#about"
            className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition hover:border-flame hover:text-flame"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}