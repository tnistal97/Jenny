'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Quote, Star } from '@/components/ui/icons';

export function Testimonials() {
  const { testimonials, portfolio } = useContent();
  const catName = (slug?: string) =>
    slug ? portfolio.categories.find((c) => c.slug === slug)?.name ?? '' : '';

  return (
    <section id="testimonios" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          align="center"
          className="max-w-2xl"
        />

        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl text-ink">{testimonials.rating}</span>
              <span className="flex gap-0.5 text-mauve">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4" fill="currentColor" stroke="none" />
                ))}
              </span>
            </div>
            <p className="text-[12px] uppercase tracking-wide2 text-stone">{testimonials.ratingLabel}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.id} delay={(i % 4) * 0.08}>
              <figure className="flex h-full flex-col rounded-tl-[1.5rem] rounded-br-[1.5rem] border border-ink/8 bg-cream p-7 transition-shadow duration-500 hover:shadow-[0_18px_50px_-30px_rgba(22,18,14,0.4)]">
                <Quote className="h-7 w-7 text-blush" />
                <div className="mt-3 flex gap-0.5 text-mauve">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5" fill="currentColor" stroke="none" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-charcoal">
                  “{t.quote}”
                </blockquote>
                {t.source ? (
                  <p className="mt-4 text-[10px] uppercase tracking-wide2 text-stone/70">vía {t.source}</p>
                ) : null}
                <figcaption className="mt-6 flex items-end justify-between border-t border-ink/10 pt-4">
                  <div>
                    <p className="font-display text-lg text-ink">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-wide2 text-stone">{t.role}</p>
                  </div>
                  {catName(t.categorySlug) ? (
                    <span className="rounded-full bg-blush/40 px-2.5 py-1 text-[9px] uppercase tracking-wide2 text-mauve">
                      {catName(t.categorySlug)}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
