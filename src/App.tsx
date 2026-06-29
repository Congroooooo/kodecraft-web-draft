import { BuildSection } from './components/BuildSection'
import { CultureSection } from './components/CultureSection'
import { EngineersSection } from './components/EngineersSection'
import { FAQSection } from './components/FAQSection'
import { Footer } from './components/Footer'
import { First90DaysSection } from './components/First90DaysSection'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { IntroSection } from './components/IntroSection'
import { OurTeamPage } from './components/OurTeamPage'
import { SimplePage } from './components/SimplePage'
import { TechStackSection } from './components/TechStackSection'
import { pageContent } from './content/siteContent'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import './App.css'

function App() {
  useRevealOnScroll()
  const currentPath = window.location.pathname
  const isTeamPage = currentPath === '/our-team'
  const isSimplePage = currentPath in pageContent

  return (
    <>
      <Header />

      {isTeamPage ? (
        <OurTeamPage />
      ) : isSimplePage ? (
        <SimplePage path={currentPath as keyof typeof pageContent} />
      ) : (
        <main id="top">
          <HeroSection />
          <IntroSection />
          <BuildSection />
          <First90DaysSection />
          <TechStackSection />
          <CultureSection />
          <EngineersSection />
          <FAQSection />
        </main>
      )}

      <Footer />
    </>
  )
}

export default App
