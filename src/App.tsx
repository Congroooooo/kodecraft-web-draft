import { BuildSection } from './components/BuildSection'
import { CultureSection } from './components/CultureSection'
import { EngineersSection } from './components/EngineersSection'
import { Footer } from './components/Footer'
import { First90DaysSection } from './components/First90DaysSection'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { IntroSection } from './components/IntroSection'
import { TechStackSection } from './components/TechStackSection'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import './App.css'

function App() {
  useRevealOnScroll()

  return (
    <>
      <Header />

      <main id="top">
        <HeroSection />
        <IntroSection />
        <BuildSection />
        <First90DaysSection />
        <TechStackSection />
        <CultureSection />
        <EngineersSection />
      </main>

      <Footer />
    </>
  )
}

export default App
