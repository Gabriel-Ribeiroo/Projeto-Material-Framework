import { ComponentProps, FormEvent } from 'react'
import { ProfileFormValues } from '../hooks/useProfileForm'
import { PersonalDataCard } from './PersonalDataCard'
import { ProfileCard } from './ProfileCard'

type ProfileFormProps = Omit<ComponentProps<typeof PersonalDataCard>, 'form'> & {
  form: ProfileFormValues
  /** Values last saved: the side card shows them, not what is mid-edit. */
  saved: ProfileFormValues
  onSubmit: (event: FormEvent) => void
}

export function ProfileForm({ form, saved, onSubmit, ...cardProps }: ProfileFormProps) {
  return (
    // Validation is ours (inline messages), so the browser's bubbles are turned off.
    <form onSubmit={onSubmit} noValidate className="grid gap-6 xl:grid-cols-[18.75rem_1fr]">
      <ProfileCard name={saved.name} course={saved.course} />
      <PersonalDataCard form={form} {...cardProps} />
    </form>
  )
}
