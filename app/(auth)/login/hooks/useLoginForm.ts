'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { student } from '@/data/student'
import { simulateRequest } from '@/hooks/useSimulatedFetch'
import { knownName, useSession, useSignedOutNotice } from '@/hooks/useSession'

export type LoginField = 'email' | 'password'

export type LoginFormErrors = Partial<Record<LoginField, string>>

/** `credentials` asks for e-mail and password; `name` only appears on an e-mail's first access. */
export type LoginStep = 'credentials' | 'name'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6
const MIN_NAME_LENGTH = 3

/** Shorter than a save: signing in should feel quick. */
const SIGN_IN_DELAY = 1200

/** Messages say what is wrong and how to fix it, not just "invalid". */
function validate(email: string, password: string): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!email.trim()) errors.email = 'Informe o e-mail da sua conta.'
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Use um e-mail válido, como nome@email.com.'
  if (!password) errors.password = 'Informe sua senha.'
  else if (password.length < MIN_PASSWORD_LENGTH) errors.password = `A senha tem pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`

  return errors
}

/** Same rule as the profile form, so a name accepted here is accepted there. */
function validateName(name: string) {
  return name.trim().length < MIN_NAME_LENGTH ? 'Informe seu nome completo (mínimo de 3 letras).' : undefined
}

/** Moves keyboard and screen reader users straight to the first problem. */
const focusFirstInvalid = () =>
  requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())

/**
 * Login form. Any well-formed e-mail and password are accepted: nothing is
 * checked against a server. An e-mail seen for the first time is asked for a
 * name before entering. `signedOut` tells whether the visitor just used "Sair".
 */
export function useLoginForm() {
  const router = useRouter()
  const { session, signIn } = useSession()
  const signedOut = useSignedOutNotice()
  const [step, setStep] = useState<LoginStep>('credentials')
  const [email, setEmail] = useState(student.email)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [touched, setTouched] = useState<Partial<Record<LoginField | 'name', boolean>>>({})
  const [submitted, setSubmitted] = useState({ credentials: false, name: false })
  const [submitting, setSubmitting] = useState(false)

  // Already signed in: skip straight to the portal.
  useEffect(() => {
    if (session && !submitting) router.replace('/')
  }, [session, submitting, router])

  const allErrors = useMemo(() => validate(email, password), [email, password])

  /** A field shows its error once it was left, or after a submit attempt. */
  const errors = useMemo(() => {
    const visible: LoginFormErrors = {}
    for (const field of ['email', 'password'] as const) {
      if (allErrors[field] && (touched[field] || submitted.credentials)) visible[field] = allErrors[field]
    }
    return visible
  }, [allErrors, touched, submitted.credentials])

  const nameError = touched.name || submitted.name ? validateName(name) : undefined

  const blur = useCallback(
    (field: LoginField | 'name') => () => setTouched(current => ({ ...current, [field]: true })),
    [],
  )

  const togglePassword = useCallback(() => setShowPassword(current => !current), [])

  const enter = useCallback(
    (displayName: string) => {
      signIn(email.trim(), displayName, remember)
      router.replace('/')
    },
    [email, remember, signIn, router],
  )

  const submitCredentials = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      setSubmitted(current => ({ ...current, credentials: true }))
      if (Object.keys(allErrors).length > 0) {
        focusFirstInvalid()
        return
      }

      setSubmitting(true)
      await simulateRequest(SIGN_IN_DELAY)

      const existing = knownName(email)
      if (existing) {
        enter(existing)
        return
      }

      setSubmitting(false)
      setStep('name')
      // The credentials form is gone, so focus would fall back to the page; start on the new field.
      requestAnimationFrame(() => document.querySelector<HTMLElement>('input[autocomplete="name"]')?.focus())
    },
    [allErrors, email, enter],
  )

  const submitName = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      setSubmitted(current => ({ ...current, name: true }))
      if (validateName(name)) {
        focusFirstInvalid()
        return
      }

      setSubmitting(true)
      enter(name.trim().replace(/\s+/g, ' '))
    },
    [name, enter],
  )

  const back = useCallback(() => {
    setStep('credentials')
    setTouched(current => ({ ...current, name: false }))
    setSubmitted(current => ({ ...current, name: false }))
  }, [])

  return {
    signedOut,
    step,
    email,
    password,
    remember,
    showPassword,
    name,
    errors,
    nameError,
    submitting,
    setEmail,
    setPassword,
    setRemember,
    setName,
    togglePassword,
    blur,
    submitCredentials,
    submitName,
    back,
  }
}
