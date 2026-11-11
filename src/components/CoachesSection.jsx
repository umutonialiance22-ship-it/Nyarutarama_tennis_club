import ImagePlaceholder from './ImagePlaceholder'
import { coaches, club } from '../data/clubData'

export default function CoachesSection() {
  return (
    <section id="coaches" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-flame">Coaches</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-night sm:text-4xl">Meet our coach</h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {coaches.map((c) => (
            <article
              key={c.id}
              className="w-full overflow-hidden rounded-2xl bg-white text-center shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-80"
            >
              <ImagePlaceholder label="Coach photo" className="h-60 w-full" />
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-night">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-flame">{c.specialty}</p>
                <p className="mt-3 text-sm text-night/70">{c.bio}</p>
                <a
                  href={club.contact.phoneHref}
                  className="mt-5 inline-block rounded-full bg-ball px-6 py-2.5 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40"
                >
                  Call {club.contact.phoneDisplay}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-night/50">More coaches will be introduced soon.</p>
      </div>
    </section>
  )
}