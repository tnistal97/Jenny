// Modelo de contenido del sitio. Es la "fuente de verdad" editable desde /admin.
// Está pensado para migrar fácilmente a un CMS/Supabase: basta con devolver este shape.

export interface GeneralInfo {
  name: string;
  role: string;
  whatsapp: string; // solo dígitos con código de país, ej: 5491134567890
  whatsappMessage: string;
  instagram: string; // handle sin @
  tiktok: string; // handle sin @
  email: string;
  zone: string;
  city: string;
}

export interface HeroContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
  /** Mini-claims bajo el hero (trust bar). */
  trust: string[];
  /** Reseña flotante sobre la imagen del hero. */
  reviewQuote: string;
  reviewAuthor: string;
}

export interface AboutHighlight {
  value: string;
  label: string;
}

export interface AboutContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  paragraphs: string[];
  /** Bullets de "por qué elegirla / qué ofrece". */
  bullets: string[];
  highlights: AboutHighlight[];
  image: string;
  cta: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PortfolioCategory {
  id: string;
  name: string; // "Casamientos / Novias"
  slug: string; // "novias"
  description: string;
  cover: string; // imagen de portada
}

export interface ProjectImage {
  id: string;
  src: string;
  caption: string; // "Preparación de piel", "Resultado final", ...
}

export interface PortfolioProject {
  id: string;
  title: string;
  categoryId: string; // referencia a PortfolioCategory.id
  description: string;
  location: string;
  date: string;
  eventType: string;
  featured: boolean; // aparece en Home
  images: ProjectImage[];
  /** Créditos editoriales del caption, ej: "Hair · @mauromaxdebrito". */
  credits?: string[];
  /** Permalink del post de Instagram (referencia). */
  permalink?: string;
}

export interface PortfolioContent {
  eyebrow: string;
  title: string;
  intro: string;
  categories: PortfolioCategory[];
  projects: PortfolioProject[];
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  eyebrow: string;
  title: string;
  intro: string;
  steps: ProcessStep[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** Categoría asociada (slug), ej: "novias". Opcional. */
  categorySlug?: string;
  /** Origen de la reseña, ej: "Google", "Instagram". Opcional. */
  source?: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  /** Rating agregado mostrado en el encabezado, ej: "5.0". */
  rating: string;
  ratingLabel: string;
  items: Testimonial[];
}

export interface BridalPoint {
  title: string;
  description: string;
}

export interface BridalContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  points: BridalPoint[];
  image: string;
  cta: string; // "Consultar disponibilidad para mi fecha"
  /** Aviso de disponibilidad / urgencia. */
  availabilityNote: string;
}

export interface Package {
  id: string;
  name: string;
  price: string; // "Consultá" o "Desde $—"
  description: string;
  features: string[];
  featured: boolean;
}

export interface PackagesContent {
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  items: Package[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: FaqItem[];
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  intro: string;
  eventTypes: string[];
}

export interface AdsContent {
  eyebrow: string;
  title: string;
  text: string;
  benefits: string[];
  cta: string;
}

export interface FinalCtaContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  text: string;
  cta: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  siteUrl: string;
}

export interface SiteContent {
  general: GeneralInfo;
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  portfolio: PortfolioContent;
  packages: PackagesContent;
  process: ProcessContent;
  bridal: BridalContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  contact: ContactContent;
  ads: AdsContent;
  finalCta: FinalCtaContent;
  seo: SeoContent;
}
