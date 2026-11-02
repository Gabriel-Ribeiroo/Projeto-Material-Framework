import type { Metadata } from 'next'
import { LoginPanel } from './components/LoginPanel'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse o portal acadêmico com seu e-mail e senha.',
}

export default function LoginPage() {
  return <LoginPanel />
}
