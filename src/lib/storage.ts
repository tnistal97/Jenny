import type { SiteContent } from '@/types/content';
import { defaultContent } from './content';

// Clave de almacenamiento local. Cambiar la versión invalida configuraciones viejas.
export const STORAGE_KEY = 'jennifer:site-content:v1';

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Merge profundo: el contenido guardado tiene prioridad, pero los campos nuevos
// del default se completan automáticamente (útil al evolucionar el esquema).
// Los arrays se reemplazan por completo (el admin controla orden y cantidad).
function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }
  if (isObject(base)) {
    const result: Json = { ...(base as Json) };
    if (isObject(override)) {
      for (const key of Object.keys(base as Json)) {
        if (key in override) {
          result[key] = deepMerge((base as Json)[key], override[key]);
        }
      }
    }
    return result as T;
  }
  return (override === undefined ? base : (override as T));
}

export function loadStoredContent(): SiteContent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return deepMerge(defaultContent, parsed);
  } catch {
    return null;
  }
}

export function saveStoredContent(content: SiteContent): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function clearStoredContent(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function mergeWithDefaults(partial: unknown): SiteContent {
  return deepMerge(defaultContent, partial);
}
