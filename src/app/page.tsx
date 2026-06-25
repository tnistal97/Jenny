import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PortfolioHome } from '@/components/sections/PortfolioHome';
import { Manifesto } from '@/components/sections/Manifesto';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { ConfianEnMi } from '@/components/sections/ConfianEnMi';
import { Testimonials } from '@/components/sections/Testimonials';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { FinalCta } from '@/components/sections/FinalCta';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Cover → Trabajos → Manifiesto → Jenny → Índice → Names → Voces → Instagram → Cierre */}
        <Hero />
        <PortfolioHome />
        <Manifesto />
        <About />
        <Services />
        <ConfianEnMi />
        <Testimonials />
        <InstagramSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
