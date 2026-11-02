'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { student } from '@/data/student'

/**
 * Login is decorative: there is no backend, token or password check. The
 * session is just who signed in (e-mail and display name), kept in the browser.
 * "Manter conectado" stores it in localStorage (survives closing the browser),
 * otherwise in sessionStorage (gone when the tab closes).
 */
export type Session = {
  email: string
  name: string
  signedInAt: string
}

const STORAGE_KEY = 'trilha-session'
/** Names given on first access, by e-mail, so the question is asked only once. */
const NAMES_KEY = 'trilha-names'
const CHANGE_EVENT = 'trilha-session-change'
/** Set by "Sair" so the login screen can confirm it; cleared on the next sign-in. */
const SIGNED_OUT_KEY = 'trilha-signed-out'

/** Reading storage on every render would hand React a new object each time; cache by the raw value. */
let cachedRaw: string | null = null
let cachedSession: Session | null = null

const normalize = (email: string) => email.trim().toLowerCase()

function readNames(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(NAMES_KEY) ?? '{}') as Record<string, string>
  } catch {
    return {}
  }
}

function rememberName(email: string, name: string) {
  localStorage.setItem(NAMES_KEY, JSON.stringify({ ...readNames(), [normalize(email)]: name }))
}

/** Name already known for an e-mail: the registered student's, or one given before. */
export function knownName(email: string): string | null {
  if (normalize(email) === normalize(student.email)) return student.name
  return readNames()[normalize(email)] ?? null
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function readSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY)
  if (raw === cachedRaw) return cachedSession

  cachedRaw = raw
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<Session>) : null
    // A session without a name (saved by an older version) counts as signed out.
    cachedSession = parsed?.email && parsed.name ? (parsed as Session) : null
  } catch {
    cachedSession = null
  }
  return cachedSession
}

function subscribe(onChange: () => void) {
  // `storage` covers other tabs; the custom event covers this one.
  window.addEventListener('storage', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

/** The server cannot see browser storage, so the session is unknown until hydration. */
const getServerSnapshot = () => undefined

const readSignedOut = () => sessionStorage.getItem(SIGNED_OUT_KEY) === '1'

/** Whether the visitor just used "Sair". `false` on the server. */
export function useSignedOutNotice() {
  return useSyncExternalStore(subscribe, readSignedOut, () => false)
}

export function useSession() {
  /** `undefined` while unknown (server render), `null` when signed out. */
  const session = useSyncExternalStore<Session | null | undefined>(subscribe, readSession, getServerSnapshot)

  const signIn = useCallback((email: string, name: string, remember: boolean) => {
    const value: Session = { email, name, signedInAt: new Date().toISOString() }
    rememberName(email, name)
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(SIGNED_OUT_KEY)
    ;(remember ? localStorage : sessionStorage).setItem(STORAGE_KEY, JSON.stringify(value))
    notify()
  }, [])

  /** Keeps the session in step with profile edits, in whichever storage it lives. */
  const updateSession = useCallback((changes: Pick<Session, 'email' | 'name'>) => {
    const current = readSession()
    const storage = localStorage.getItem(STORAGE_KEY) ? localStorage : sessionStorage
    if (!current) return

    rememberName(changes.email, changes.name)
    storage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...changes }))
    notify()
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.setItem(SIGNED_OUT_KEY, '1')
    notify()
  }, [])

  return { session, ready: session !== undefined, signIn, updateSession, signOut }
}
