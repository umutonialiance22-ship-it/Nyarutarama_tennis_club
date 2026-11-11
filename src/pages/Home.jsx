import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import CourtsSection from '../components/CourtsSection'
import TariffsSection from '../components/TariffsSection'
import CoachesSection from '../components/CoachesSection'
import BookingCTA from '../components/BookingCTA'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CourtsSection />
        <TariffsSection />
        <CoachesSection />
        <BookingCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}