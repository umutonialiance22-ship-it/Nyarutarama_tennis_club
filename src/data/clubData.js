export const club = {
  name: 'Nyarutarama Tennis Club',
  tagline: 'Be Healthy, Look Good Feel Better & You will be Successful',
  shortDescription:
    'Tennis, fitness and wellness in the heart of Kigali, for players of every level.',
  address: 'Nyarutarama Sports Centre, Nyarutarama, Kigali, Rwanda',
  contact: {
    name: 'Rudashirikaka Aimable',
    role: 'Operations Manager & Coach',
    phoneDisplay: '0788 744 202',
    phoneHref: 'tel:+250788744202',
  },
  hoursSummary: 'Open 7 days a week',
  hours: [{ day: 'Monday - Sunday', time: '6:00 AM - 9:00 PM' }],
  instagram: '#', // put the official Instagram URL here
  mapsLink:
    'https://www.google.com/maps/place/Nyarutarama+Sports+Centre/@-1.944693,30.1017888,17z/data=!3m1!4b1!4m6!3m5!1s0x19dca6e6060a2417:0xdccaad7d3b20457e!8m2!3d-1.944693!4d30.1017888!16s%2Fg%2F11b6xcb6dd',
  mapEmbed: 'https://www.google.com/maps?q=-1.944693,30.1017888&z=17&output=embed',
}

export const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Courts', href: '/#courts' },
  { label: 'Tariffs', href: '/#tariffs' },
  { label: 'Coaches', href: '/#coaches' },
  { label: 'Contact', href: '/#contact' },
]

export const courts = [
  {
    id: 1,
    name: 'Court 1',
    category: 'VIP Court',
    vip: true,
    image: '/images/court1.jpg',
    description:
      'Our premier court, dedicated to VIP members for a more exclusive playing experience.',
    info: [
      { label: 'Access', value: 'VIP members' },
      { label: 'Surface', value: 'To be confirmed' },
      { label: 'Lighting', value: 'To be confirmed' },
    ],
  },
  {
    id: 2,
    name: 'Court 2',
    category: 'General Court',
    vip: false,
    image: '/images/court2.jpg',
    description:
      'A well-kept court open to all members and visitors for casual games and training.',
    info: [
      { label: 'Access', value: 'All members' },
      { label: 'Surface', value: 'To be confirmed' },
      { label: 'Lighting', value: 'To be confirmed' },
    ],
  },
  {
    id: 3,
    name: 'Court 3',
    category: 'General Court',
    vip: false,
    image: '/images/court3.jpg',
    description:
      'A general court that is ideal for friendly matches, lessons and practice sessions.',
    info: [
      { label: 'Access', value: 'All members' },
      { label: 'Surface', value: 'To be confirmed' },
      { label: 'Lighting', value: 'To be confirmed' },
    ],
  },
]

export const coaches = [
  {
    id: 1,
    name: 'Rudashirikaka Aimable',
    role: 'Operations Manager & Coach',
    phoneDisplay: '0788 744 202',
    phoneHref: 'tel:+250788744202',
    photo: '/images/coach-aimable.jpg',
  },
  {
    id: 2,
    name: 'MUHIRE Joshua',
    role: 'Coach',
    phoneDisplay: '0780 752 398',
    phoneHref: 'tel:+250780752398',
    photo: '/images/coach-joshua.jpg',
  },
  {
    id: 3,
    name: 'Alphonse HABIMANA',
    role: 'Coach',
    phoneDisplay: '0788 826 240',
    phoneHref: 'tel:+250788826240',
    photo: '/images/coach-alphonse.jpg',
  },
  {
    id: 4,
    name: 'Emmanuel MUGENZI',
    role: 'Coach',
    phoneDisplay: '0789 221 677',
    phoneHref: 'tel:+250789221677',
    photo: '/images/coach-emmanuel.jpg',
  },
]

/* ---------------- TARIFFS (from the club's tariff table, prices in Rwf) ---------------- */

export const durations = ['1 Month', '3 Months', '6 Months', '1 Year']

export const sessionRates = [
  { label: 'Tennis, 1 person', price: '8,000 Rwf / hour' },
  { label: 'Child under 18', price: '4,000 Rwf / hour' },
  { label: 'Single (2 persons)', price: '14,000 Rwf / hour' },
  { label: 'Double (4 persons)', price: '24,000 Rwf / hour' },
]

export const packages = [
  {
    name: 'Tennis',
    icon: '',
    rows: [
      { who: 'Adult (1 person)', prices: ['40,000', '100,000', '140,000', '200,000'] },
      { who: 'Child under 18', prices: ['30,000', '60,000', '100,000', '150,000'] },
      { who: 'Couple', prices: ['70,000', '140,000', '200,000', '300,000'] },
      { who: 'Family, 2 children (4 persons)', prices: ['100,000', '200,000', '300,000', '420,000'] },
      { who: 'Family, 4 children (6 persons)', prices: ['125,000', '250,000', '420,000', '500,000'] },
    ],
  },
  {
    name: 'Gym & Tennis',
    icon: '',
    rows: [
      { who: 'Single', prices: ['80,000', '140,000', '200,000', '320,000'] },
      { who: 'Couple', prices: ['120,000', '250,000', '320,000', '540,000'] },
    ],
  },
  {
    name: 'Aerobics & Tennis',
    icon: '',
    rows: [
      { who: 'Single', prices: ['70,000', '125,000', '180,000', '280,000'] },
      { who: 'Couple', prices: ['110,000', '220,000', '280,000', '460,000'] },
    ],
  },
  {
    name: 'Gym, Aerobics & Tennis',
    icon: '',
    rows: [
      { who: 'Single', prices: ['110,000', '200,000', '300,000', '500,000'] },
      { who: 'Couple', prices: ['160,000', '320,000', '420,000', '640,000'] },
    ],
  },
  {
    name: 'Swimming & Tennis',
    icon: '',
    rows: [
      { who: 'Single adult', prices: ['80,000', '180,000', '240,000', '380,000'] },
      { who: 'Couple', prices: ['140,000', '260,000', '380,000', '560,000'] },
      { who: 'Family, 2 children (4 persons)', prices: ['160,000', '330,000', '420,000', '600,000'] },
      { who: 'Family, 4 children (6 persons)', prices: ['200,000', '380,000', '480,000', '680,000'] },
    ],
  },
  {
    name: 'Swimming, Gym & Tennis',
    icon: '',
    rows: [
      { who: 'Single adult', prices: ['140,000', '280,000', '360,000', '560,000'] },
      { who: 'Couple', prices: ['200,000', '420,000', '560,000', '760,000'] },
      { who: 'Family, 2 children (4 persons)', prices: ['240,000', '480,000', '580,000', '780,000'] },
      { who: 'Family, 4 children (6 persons)', prices: ['260,000', '480,000', '680,000', '880,000'] },
    ],
  },
  {
    name: 'Swimming, Aerobics & Tennis',
    icon: '',
    rows: [
      { who: 'Single adult', prices: ['100,000', '220,000', '320,000', '500,000'] },
      { who: 'Couple', prices: ['160,000', '320,000', '450,000', '650,000'] },
      { who: 'Family, 2 children (4 persons)', prices: ['200,000', '400,000', '520,000', '680,000'] },
      { who: 'Family, 4 children (6 persons)', prices: ['240,000', '440,000', '620,000', '780,000'] },
    ],
  },
  {
    name: 'Sauna / Steam & Tennis',
    icon: '',
    rows: [
      { who: 'Single', prices: ['100,000', '200,000', '280,000', '380,000'] },
      { who: 'Couple', prices: ['160,000', '280,000', '400,000', '560,000'] },
    ],
  },
  {
    name: 'Sauna / Steambath, Swimming & Tennis',
    icon: '',
    rows: [
      { who: 'Single', prices: ['150,000', '300,000', '480,000', '680,000'] },
      { who: 'Couple', prices: ['220,000', '400,000', '600,000', '800,000'] },
    ],
  },
  {
    name: 'Sauna / Steambath, Swimming, Gym & Tennis',
    icon: '',
    rows: [
      { who: 'Single', prices: ['250,000', '500,000', '680,000', '800,000'] },
      { who: 'Couple', prices: ['350,000', '600,000', '780,000', '880,000'] },
    ],
  },
  // TODO: this package appears twice in the club's table with the same name but
  // different prices. Confirm the correct name/prices with the club.
  {
    name: 'Sauna / Steambath, Swimming & Tennis (2)',
    icon: '',
    rows: [
      { who: 'Single', prices: ['220,000', '450,000', '600,000', '740,000'] },
      { who: 'Couple', prices: ['300,000', '560,000', '700,000', '800,000'] },
    ],
  },
]
// Booking hours: first slot starts at 6:00, last slot ends at 21:00 (9 PM)
export const bookingConfig = { openHour: 6, closeHour: 21 }