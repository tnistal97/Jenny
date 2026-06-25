'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useContent } from '@/lib/content-context';
import { instagramUrl, tiktokUrl } from '@/lib/whatsapp';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ButtonLink } from '@/components/ui/Button';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { ArrowRight, Instagram, TikTok } from '@/components/ui/icons';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { hero, general } = useContent();
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="relative overflow-hidden bg-canvas pt-[72px]">
      <div className="mx-auto grid max-w-container grid-cols-1 items-stretch gap-y-10 px-6 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-x-12 lg:px-12 lg:pt-16">
        {/* Texto */}
        <div className="flex flex-col justify-center pb-8 lg:pb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 text-[11px] uppercase tracking-label text-stone"
          >
            {hero.eyebrow}
          </motion.span>

          <h1 className="font-display text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-[5.2rem]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="block"
            >
              {hero.titleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
              className="block italic"
            >
              {hero.titleLine2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-stone"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <WhatsAppButton size="lg" source="hero">{hero.ctaPrimary}</WhatsAppButton>
            <ButtonLink href="/portfolio" variant="outline" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              {hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-11 flex items-center gap-5"
          >
            <a
              href={instagramUrl(general.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-ink/60 transition-colors hover:text-ink"
            >
              <Instagram className="h-5 w-5" />
            </a>
            {general.tiktok ? (
              <a
                href={tiktokUrl(general.tiktok)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-ink/60 transition-colors hover:text-ink"
              >
                <TikTok className="h-5 w-5" />
              </a>
            ) : null}
            <span className="h-4 w-px bg-ink/15" />
            <span className="text-[11px] uppercase tracking-wide2 text-stone">@{general.instagram}</span>
          </motion.div>
        </div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="relative -mr-6 h-[58vh] min-h-[420px] overflow-hidden sm:-mr-8 lg:mr-[-3rem] lg:h-auto lg:min-h-[600px] lg:rounded-bl-[2.5rem]"
        >
          <PhotoFrame
            src={hero.image}
            alt="Look de maquillaje dewy con glow real, por Jenny Rojas en Las Cañitas, CABA"
            className="h-full w-full"
            imgClassName="object-[50%_22%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            overlay="soft"
          />
        </motion.div>
      </div>
    </section>
  );
}
