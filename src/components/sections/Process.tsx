'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Process() {
  const { process } = useContent();

  return (
    <section id="proceso" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {process.steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.08}>
              <div className="group relative h-full">
                <div className="mb-5 h-px w-full bg-ink/15 transition-colors duration-500 group-hover:bg-ink/40" />
                <span className="font-display text-3xl text-mauve">{step.step}</span>
                <h3 className="mt-4 font-display text-xl leading-snug text-ink">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-stone">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
