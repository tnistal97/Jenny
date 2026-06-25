import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Packages } from '@/components/sections/Packages';
import { Process } from '@/components/sections/Process';
import { PortfolioHome } from '@/components/sections/PortfolioHome';
import { Bridal } from '@/components/sections/Bridal';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { AdsBlock } from '@/components/sections/AdsBlock';
import { FinalCta } from '@/components/sections/FinalCta';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { MobileCtaBar } from '@/components/ui/MobileCtaBar';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Camino emocional: prueba → persona → sueño novia → palabras reales */}
        <Hero />
        <TrustBar />
        <PortfolioHome />
        <About />
        <Bridal />
        <Process />
        <Testimonials />
        {/* Logística / decisión (debajo del camino emocional) */}
        <Services />
        <Packages />
        <Faq />
        <Contact />
        <AdsBlock />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </>
  );
}
