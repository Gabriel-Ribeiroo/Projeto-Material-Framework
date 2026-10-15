import type { Metadata } from 'next'
import { ProfilePanel } from './components/ProfilePanel'

export const metadata: Metadata = {
  title: 'Meu perfil',
  description: 'Dados de contato, curso e configurações de segurança da conta acadêmica.',
}

export default function ProfilePage() {
  return <ProfilePanel />
}
