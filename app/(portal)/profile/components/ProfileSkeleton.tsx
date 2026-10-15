import { PersonalDataCardSkeleton } from './PersonalDataCardSkeleton'
import { ProfileCardSkeleton } from './ProfileCardSkeleton'

/** Outline of the profile form while the student record loads. */
export function ProfileSkeleton() {
  return (
    <div role="status" aria-busy className="grid gap-6 xl:grid-cols-[18.75rem_1fr]">
      <span className="sr-only">Carregando seus dados…</span>
      <ProfileCardSkeleton />
      <PersonalDataCardSkeleton />
    </div>
  )
}
