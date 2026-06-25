'use client';

import { useEffect, useState } from 'react';
import { Login } from './Login';
import { AdminPanel } from './AdminPanel';

const SESSION_KEY = 'jennifer:admin:authed';

export function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === '1');
    setReady(true);
  }, []);

  function login() {
    sessionStorage.setItem(SESSION_KEY, '1');
    setAuthed(true);
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  // Evita parpadeo del login antes de leer sessionStorage.
  if (!ready) return <div className="min-h-screen bg-[#0c0c0e]" />;

  return authed ? <AdminPanel onLogout={logout} /> : <Login onSuccess={login} />;
}
