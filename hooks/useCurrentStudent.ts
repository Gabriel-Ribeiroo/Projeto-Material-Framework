'use client'

import { student } from '@/data/student'
import { useSession } from '@/hooks/useSession'

/** "Maria Clara Souza" → "MS": first and last word. */
function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'

  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return `${first}${last}`.toUpperCase()
}

/**
 * The signed-in student: name and e-mail come from the session, the academic
 * record (registration, course…) from `@/data/student`, the only one there is.
 */
export function useCurrentStudent() {
  const { session } = useSession()
  const name = session?.name ?? student.name

  return {
    ...student,
    name,
    email: session?.email ?? student.email,
    initials: initialsOf(name),
  }
}
