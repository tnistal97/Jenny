'use client';

import { useState } from 'react';

const ADMIN_PASS = process.env.NEXT_PUBLIC_JENNIFER_ADMIN_PASS || 'jennifer2026';

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#0c0c0e] px-6 text-neutral-200">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-neutral-700 font-display text-2xl text-white">
            J
          </span>
          <h1 className="mt-5 text-xl font-semibold text-white">Panel de administración</h1>
          <p className="mt-1 text-sm text-neutral-500">Jennifer Makeup Artist</p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
              Contraseña
            </span>
            <input
              type="password"
              value={pass}
              autoFocus
              onChange={(e) => {
                setPass(e.target.value);
                setError(false);
              }}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 outline-none transition-colors focus:border-neutral-400"
              placeholder="••••••••"
            />
          </label>
          {error ? <p className="text-sm text-red-400">Contraseña incorrecta.</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-neutral-600">
          Protección local del lado del cliente (no es seguridad de producción).
          <br />
          Configurable con <code className="text-neutral-500">NEXT_PUBLIC_JENNIFER_ADMIN_PASS</code>.
        </p>
      </div>
    </div>
  );
}
