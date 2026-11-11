import SmartImage from './SmartImage'

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <SmartImage
           src="/images/about.jpg"
           alt="Nyarutarama Tennis Club"
           label="Club photo placeholder"
           className="h-72 rounded-2xl shadow-lg sm:h-96"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-flame">About Us</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-night sm:text-4xl">
            A club built around the love of the game
          </h2>
          <p className="mt-5 text-night/70">
            Nyarutarama Tennis Club is a welcoming space in Kigali where players meet, train and
            compete. We offer well-maintained courts and a relaxed, friendly atmosphere for everyone.
          </p>
          <p className="mt-4 text-night/70">
            Beyond tennis, members can enjoy gym, aerobics, swimming and sauna options. Our community
            brings together beginners, regular players and experienced competitors who share one thing:
            a passion for staying active.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Three quality courts', 'Gym & aerobics', 'Swimming', 'Sauna & steam'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-night">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ball text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}