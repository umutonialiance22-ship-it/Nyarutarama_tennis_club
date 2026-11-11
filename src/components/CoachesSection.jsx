import SmartImage from './SmartImage'
import { coaches } from '../data/clubData'

export default function CoachesSection() {
  return (
    <section id="coaches" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-flame">Coaches</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-night sm:text-4xl">Meet our coaches</h2>
          <p className="mt-3 text-night/60">Call a coach directly to ask about lessons and training.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((c) => (
            <article
              key={c.id}
              className="group overflow-hidden rounded-2xl bg-white text-center shadow-sm ring-1 ring-black/5 transition duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-flame/20 hover:ring-flame/40"
            >
              <SmartImage
                src={c.photo}
                alt={c.name}
                label="Coach photo"
                className="h-48 w-full"
                imgClassName="transition duration-700 group-hover:scale-110"
              />
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-night">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-flame">{c.role}</p>
                <a
                  href={c.phoneHref}
                  className="mt-4 inline-block rounded-full bg-ball px-4 py-2 text-xs font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40"
                >
                   {c.phoneDisplay}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}