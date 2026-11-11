import CourtCard from './CourtCard'
import { courts } from '../data/clubData'

export default function CourtsSection() {
  return (
    <section id="courts" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-flame">Our Courts</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-night sm:text-4xl">Pick your court</h2>
          <p className="mt-3 text-night/60">One VIP court and two general courts, ready when you are.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courts.map((c) => (
            <CourtCard key={c.id} court={c} />
          ))}
        </div>
      </div>
    </section>
  )
}