import { useState } from 'react'
import { durations, sessionRates, packages } from '../data/clubData'

export default function TariffsSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="tariffs" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Friendly message */}
        <div className="mx-auto max-w-2xl rounded-3xl bg-cream px-6 py-10 text-center ring-1 ring-black/5 sm:px-10">
          <div className="text-4xl"></div>
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-flame">Tariffs</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-night sm:text-4xl">Check out our prices</h2>
          <p className="mt-3 text-night/60">
            Court sessions and memberships for singles, couples and families, with options for tennis,
            gym, aerobics, swimming and sauna.
          </p>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mt-7 rounded-full bg-flame px-8 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-flame-dark hover:shadow-lg hover:shadow-flame/30"
          >
            {open ? 'Hide Prices' : 'View All Prices'}
          </button>
        </div>

        {/* Full prices */}
        {open && (
          <div className="mt-12">
            {/* Per-hour sessions */}
            <h3 className="text-center font-display text-lg font-bold text-night">Pay per session</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sessionRates.map((s) => (
                <div key={s.label} className="rounded-2xl bg-ball/30 px-5 py-4 text-center ring-1 ring-ball">
                  <p className="text-sm text-night/70">{s.label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-night">{s.price}</p>
                </div>
              ))}
            </div>

            {/* Membership packages */}
            <h3 className="mt-12 text-center font-display text-lg font-bold text-night">Memberships &amp; packages</h3>
            <p className="mt-1 text-center text-sm text-night/50">All prices are in Rwandan francs (Rwf)</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {packages.map((p) => (
                <article key={p.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
                  <header className="flex items-center gap-3 bg-flame px-5 py-3 text-white">
                    <span className="text-xl">{p.icon}</span>
                    <h4 className="font-display font-semibold">{p.name}</h4>
                  </header>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-110 text-left text-sm">
                      <thead>
                        <tr className="bg-cream text-xs text-night/60">
                          <th className="px-4 py-2 font-medium">Who</th>
                          {durations.map((d) => (
                            <th key={d} className="whitespace-nowrap px-2 py-2 text-right font-medium">{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {p.rows.map((r) => (
                          <tr key={r.who} className="border-t border-black/5 transition hover:bg-ball/15">
                            <td className="px-4 py-2.5 font-medium text-night">{r.who}</td>
                            {r.prices.map((price, i) => (
                              <td key={i} className="whitespace-nowrap px-2 py-2.5 text-right tabular-nums text-night/80">
                                {price}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}