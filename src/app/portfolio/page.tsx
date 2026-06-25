import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortfolioExperience } from '@/components/portfolio/PortfolioExperience';

export const metadata: Metadata = {
  title: 'Portfolio — Beauty, editorial, hair & brows',
  description:
    'Portfolio de Jenny Rojas: looks dewy con glow real para beauty, editorial, eventos y producciones. Makeup, hair & brows en Las Cañitas, CABA.',
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
    </>
  );
}
