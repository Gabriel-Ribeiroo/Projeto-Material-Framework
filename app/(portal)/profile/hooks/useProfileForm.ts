'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { student } from '@/data/student'
import { SIMULATED_SAVE_DELAY, simulateRequest, useSimulatedFetch } from '@/hooks/useSimulatedFetch'
import { useToast } from '@/hooks/useToast'

export type ProfileFormValues = {
  name: string
  email: string
  phone: string
  city: string
  course: string
}

/** Fields the student can edit. The course is read-only. */
export type EditableField = Exclude<keyof ProfileFormValues, 'course'>

export type ProfileFormErrors = Partial<Record<EditableField, string>>

const editableFields: EditableField[] = ['name', 'email', 'phone', 'city']

const initialForm: ProfileFormValues = {
  name: student.name,
  email: student.email,
  phone: student.phone,
  city: student.city,
  course: student.course,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Messages say what is wrong and how to fix it, not just "invalid". */
function validate(form: ProfileFormValues): ProfileFormErrors {
  const errors: ProfileFormErrors = {}
  const phoneDigits = form.phone.replace(/\D/g, '')

  if (form.name.trim().length < 3) errors.name = 'Informe seu nome completo (mínimo de 3 letras).'
  if (!form.email.trim()) errors.email = 'Informe um e-mail para contato.'
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Use um e-mail válido, como nome@email.com.'
  if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.phone = 'Informe o telefone com DDD, como (11) 99999-8888.'
  if (!form.city.trim()) errors.city = 'Informe a cidade onde você mora.'

  return errors
}

/**
 * Profile form: loads the record, validates as the student types, and saves
 * through a simulated request that takes a couple of seconds. The save fails
 * when the browser is offline (DevTools › Network › Offline), which is how
 * the error state can be demonstrated.
 */
export function useProfileForm() {
  const { showToast } = useToast()
  const record = useSimulatedFetch(initialForm)
  const { reload } = record
  const [form, setForm] = useState<ProfileFormValues>(initialForm)
  /** Last values the "server" accepted; the baseline for dirty checks and discarding. */
  const [saved, setSaved] = useState<ProfileFormValues>(initialForm)
  const [touched, setTouched] = useState<Partial<Record<EditableField, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [cleared, setCleared] = useState(false)

  /** Fill the fields once the simulated request for the student record lands. */
  useEffect(() => {
    if (!record.data) return
    setForm(record.data)
    setSaved(record.data)
  }, [record.data])

  const clear = useCallback(() => setCleared(true), [])

  /** Restoring goes through the request again, skeletons included. */
  const restore = useCallback(() => {
    setCleared(false)
    setSaveError(false)
    reload()
  }, [reload])

  const allErrors = useMemo(() => validate(form), [form])

  /** A field shows its error once it was left, or after a save attempt. */
  const errors = useMemo(() => {
    const visible: ProfileFormErrors = {}
    for (const field of editableFields) {
      if (allErrors[field] && (touched[field] || submitted)) visible[field] = allErrors[field]
    }
    return visible
  }, [allErrors, touched, submitted])

  const dirty = editableFields.some(field => form[field] !== saved[field])

  const update = useCallback(
    (key: EditableField) => (value: string) => setForm(current => ({ ...current, [key]: value })),
    [],
  )

  const blur = useCallback((key: EditableField) => () => setTouched(current => ({ ...current, [key]: true })), [])

  const discard = useCallback(() => {
    setForm(saved)
    setTouched({})
    setSubmitted(false)
    setSaveError(false)
    showToast('Alterações descartadas.', 'info')
  }, [saved, showToast])

  const save = useCallback(async () => {
    setSubmitted(true)

    if (Object.keys(allErrors).length > 0) {
      showToast('Revise os campos destacados antes de salvar.', 'error')
      // Move keyboard and screen reader users straight to the first problem.
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }

    setSaving(true)
    setSaveError(false)
    await simulateRequest(SIMULATED_SAVE_DELAY)
    setSaving(false)

    if (!navigator.onLine) {
      setSaveError(true)
      return
    }

    setSaved(form)
    setTouched({})
    setSubmitted(false)
    showToast('Alterações salvas com sucesso!')
  }, [allErrors, form, showToast])

  const submit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      save()
    },
    [save],
  )

  return {
    loading: record.loading,
    cleared,
    clear,
    restore,
    form,
    saved,
    errors,
    dirty,
    saving,
    saveError,
    update,
    blur,
    discard,
    submit,
    retry: save,
  }
}
