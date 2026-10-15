'use client'

import { UserRound } from 'lucide-react'
import { ClearDataButton } from '@/components/ClearDataButton'
import { EmptyState } from '@/components/EmptyState'
import { PageHeading } from '@/components/PageHeading'
import { useProfileForm } from '../hooks/useProfileForm'
import { ProfileForm } from './ProfileForm'
import { ProfileSkeleton } from './ProfileSkeleton'
import { SecurityCard } from './SecurityCard'

export function ProfilePanel() {
  const {
    loading,
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
    retry,
  } = useProfileForm()

  return (
    <div>
      <PageHeading
        eyebrow="Conta acadêmica"
        title="Meu perfil"
        description="Mantenha seus dados de contato atualizados para receber comunicados importantes."
        action={<ClearDataButton onClear={clear} disabled={loading || cleared || saving} />}
      />
      {loading ? (
        <ProfileSkeleton />
      ) : cleared ? (
        <EmptyState
          icon={UserRound}
          title="Seus dados não estão carregados"
          description="O cadastro foi limpo desta tela. Recarregue para editar novamente suas informações de contato."
          actionLabel="Recarregar cadastro"
          onAction={restore}
        />
      ) : (
        <ProfileForm
          form={form}
          saved={saved}
          errors={errors}
          dirty={dirty}
          saving={saving}
          saveError={saveError}
          onChange={update}
          onBlur={blur}
          onDiscard={discard}
          onRetry={retry}
          onSubmit={submit}
        />
      )}
      <SecurityCard />
    </div>
  )
}
