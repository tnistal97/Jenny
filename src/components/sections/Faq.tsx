'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function Faq() {
  const { faq } = useContent();
  const [open, setOpen] = useState<string | null>(faq.items[0]?.id ?? null);

  return (
    <section id="faq" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
        <div>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} intro={faq.intro} />
          <Reveal delay={0.1}>
            <div className="mt-8 hidden lg:block">
              <WhatsAppButton size="lg" source="faq">Tengo otra duda</WhatsAppButton>
            </div>
          </Reveal>
        </div>

        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {faq.items.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <Reveal key={item.id} delay={(i % 6) * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-lg text-ink sm:text-xl">{item.question}</span>
                    <span className={`relative h-5 w-5 flex-none transition-transform duration-500 ease-lux ${isOpen ? 'rotate-45' : ''}`}>
                      <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-ink" />
                      <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-ink" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-[15px] leading-relaxed text-stone">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
          <div className="pt-6 lg:hidden">
            <WhatsAppButton size="lg" source="faq" className="w-full">Tengo otra duda</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
