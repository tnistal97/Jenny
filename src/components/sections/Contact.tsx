'use client';

import { useState } from 'react';
import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl, instagramUrl, mailtoUrl } from '@/lib/whatsapp';
import { trackWhatsApp } from '@/lib/analytics';
import { Reveal } from '@/components/ui/Reveal';
import { Whatsapp, Mail, Instagram, ArrowRight } from '@/components/ui/icons';

export function Contact() {
  const { contact, general } = useContent();
  const [form, setForm] = useState({ name: '', date: '', type: contact.eventTypes[0] ?? '', message: '' });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Hola Jennifer! Soy ${form.name || '...'}.`,
      `Tipo de evento: ${form.type}`,
      form.date ? `Fecha: ${form.date}` : '',
      form.message ? `Mensaje: ${form.message}` : '',
      'Vi tu web y quería consultar disponibilidad y presupuesto.',
    ].filter(Boolean);
    trackWhatsApp('contact_form');
    window.open(buildWhatsAppUrl(general.whatsapp, lines.join('\n')), '_blank', 'noopener');
  }

  const inputCls =
    'w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-stone/60 focus:border-ink';

  return (
    <section id="contacto" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <Reveal>
          <div>
            <span className="text-[11px] uppercase tracking-label text-stone">{contact.eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-ink lg:text-[44px]">{contact.title}</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stone">{contact.intro}</p>

            <div className="mt-9 space-y-4">
              <a href={buildWhatsAppUrl(general.whatsapp, general.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('contact_info')} className="flex items-center gap-4 text-ink">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-ink/15"><Whatsapp className="h-5 w-5" /></span>
                <span><span className="block text-[11px] uppercase tracking-wide2 text-stone">WhatsApp</span>+{general.whatsapp}</span>
              </a>
              <a href={mailtoUrl(general.email)} className="flex items-center gap-4 text-ink">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-ink/15"><Mail className="h-5 w-5" /></span>
                <span><span className="block text-[11px] uppercase tracking-wide2 text-stone">Email</span>{general.email}</span>
              </a>
              <a href={instagramUrl(general.instagram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-ink">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-ink/15"><Instagram className="h-5 w-5" /></span>
                <span><span className="block text-[11px] uppercase tracking-wide2 text-stone">Instagram</span>@{general.instagram}</span>
              </a>
              <p className="pt-2 text-[13px] text-stone">{general.zone}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="rounded-tl-[2rem] rounded-br-[2rem] border border-ink/10 bg-cream/70 p-7 sm:p-9">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-wide2 text-stone">Nombre</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" className={inputCls} />
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-wide2 text-stone">Tipo de evento</span>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
                    {contact.eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-wide2 text-stone">Fecha (aprox.)</span>
                  <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Ej: 15/03/2026" className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-wide2 text-stone">Mensaje</span>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Contame sobre tu evento..." className={`${inputCls} resize-y`} />
              </label>
              <button type="submit" className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[13px] uppercase tracking-wide2 text-cream transition-colors hover:bg-charcoal">
                <Whatsapp className="h-4 w-4" /> Enviar consulta por WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-1" />
              </button>
              <p className="text-center text-[11px] text-stone">Se abre WhatsApp con tu mensaje listo para enviar. Respondo a la brevedad.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
