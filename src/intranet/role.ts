import { useEffect, useState } from 'react';
import { roles } from './data';
import type { Role } from './data';

// "View as" role, shared by the account menu and My tasks. Remembered per browser where storage allows.
const KEY = 'cicRole';
const EVENT = 'cic:role';
const TOAST = 'cic:toast';

function read(): Role['id'] {
  try {
    const v = window.localStorage.getItem(KEY);
    if (roles.some((r) => r.id === v)) return v as Role['id'];
  } catch {

    // Storage blocked: fall back to the default role.
  }return 'hod';
}

export function setRole(id: Role['id']) {
  try {
    window.localStorage.setItem(KEY, id);
  } catch {

    // Not remembered, but still applied for this page view.
  }window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

export function useRole(): Role {
  const [id, setId] = useState<Role['id']>(read);
  useEffect(() => {
    const on = (e: Event) => setId((e as CustomEvent<Role['id']>).detail);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return roles.find((r) => r.id === id)!;
}

/** Small confirmation message in the corner, shown by the intranet layout. */
export function toast(title: string, sub?: string) {
  window.dispatchEvent(new CustomEvent(TOAST, { detail: { title, sub } }));
}

export function useToasts() {
  const [items, setItems] = useState<{id: number;title: string;sub?: string;}[]>([]);
  useEffect(() => {
    const on = (e: Event) => {
      const id = Date.now() + Math.random();
      setItems((t) => [...t, { id, ...(e as CustomEvent<{title: string;sub?: string;}>).detail }]);
      window.setTimeout(() => setItems((t) => t.filter((x) => x.id !== id)), 3200);
    };
    window.addEventListener(TOAST, on);
    return () => window.removeEventListener(TOAST, on);
  }, []);
  return items;
}
