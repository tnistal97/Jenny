import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortfolioExperience } from '@/components/portfolio/PortfolioExperience';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { MobileCtaBar } from '@/components/ui/MobileCtaBar';

export const metadata: Metadata = {
  title: 'Portfolio — Novias, social, editorial y clases',
  description:
    'Portfolio de Jennifer Makeup Artist: casamientos y novias, maquillaje social, producciones editoriales, clases de automaquillaje y antes/después. Trabajos reales en CABA.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <PortfolioExperience />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </>
  );
}
