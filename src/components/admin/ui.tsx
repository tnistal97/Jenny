'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

/* ── Layout ──────────────────────────────────────────────────────────── */

export function Panel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm text-neutral-400">{description}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 ${className}`}>{children}</div>
  );
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

/* ── Campos ──────────────────────────────────────────────────────────── */

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-[11px] text-neutral-500">{hint}</span> : null}
    </label>
  );
}

const inputCls =
  'w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition-colors focus:border-neutral-400';

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} resize-y leading-relaxed`}
    />
  );
}

export function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* ── Imagen (URL o subir archivo → data URL) ─────────────────────────── */

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-4">
      <div className="relative h-24 w-20 flex-none overflow-hidden rounded-lg border border-neutral-700 bg-neutral-950">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="preview" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-[10px] text-neutral-600">sin imagen</div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <TextInput value={value} onChange={onChange} placeholder="/images/... o https://..." />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:bg-neutral-800"
          >
            Subir archivo
          </button>
          <span className="text-[11px] text-neutral-500">Se guarda embebido (data URL).</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) onChange(await readFileAsDataUrl(file));
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}

/* ── Botones / controles de lista ────────────────────────────────────── */

export function ItemControls({
  onUp,
  onDown,
  onRemove,
  disableUp,
  disableDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  const btn = 'grid h-8 w-8 place-items-center rounded-md border border-neutral-700 text-neutral-300 transition-colors hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <div className="flex items-center gap-1.5">
      <button type="button" onClick={onUp} disabled={disableUp} className={btn} aria-label="Subir">
        ↑
      </button>
      <button type="button" onClick={onDown} disabled={disableDown} className={btn} aria-label="Bajar">
        ↓
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="grid h-8 w-8 place-items-center rounded-md border border-red-900/60 text-red-400 transition-colors hover:bg-red-950/50"
        aria-label="Eliminar"
      >
        ✕
      </button>
    </div>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-dashed border-neutral-700 py-3 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:bg-neutral-900"
    >
      + {children}
    </button>
  );
}
