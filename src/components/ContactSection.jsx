import { club } from '../data/clubData'
import { useLang } from '../context/LanguageContext'

function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-cream p-5 ring-1 ring-black/5">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-flame">{title}</h4>
      <div className="mt-2 text-night/80">{children}</div>
    </div>
  )
}

export default function ContactSection() {
  const { t } = useLang()

  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-flame">{t('nav.contact')}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-night sm:text-4xl">{t('Find us and get in touch')}</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card title={t('Address')}>{club.address}</Card>

            <Card title={t('Opening Hours')}>
              <p className="font-semibold text-night">{t('booking.hours')}</p>
              <p className="text-sm">{t('Every day, 7 days a week')}</p>
            </Card>

            <Card title={t('Operations Manager & Coach')}>
              <p className="font-semibold text-night">{club.contact.name}</p>
              <a href={club.contact.phoneHref} className="text-flame-dark hover:underline">
                {club.contact.phoneDisplay}
              </a>
            </Card>

            <Card title="Instagram">
              <a href={club.instagram} target="_blank" rel="noreferrer" className="font-medium text-flame-dark hover:underline">
                {t('Follow us on Instagram')}
              </a>
            </Card>

            <a
              href={club.contact.phoneHref}
              className="rounded-full bg-ball px-6 py-3 text-center font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40 sm:col-span-2"
            >
              {t('Call us now')}
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-black/10">
            <iframe
              title={t('Nyarutarama Sports Centre location')}
              src={club.mapEmbed}
              className="h-72 w-full border-0 sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={club.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="block bg-flame py-3 text-center text-sm font-semibold text-white transition hover:bg-flame-dark"
            >
              {t('Open in Google Maps')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}