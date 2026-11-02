'use client'

import { GraduationCap } from 'lucide-react'
import { Alert } from '@/components/Alert'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useLoginForm } from '../hooks/useLoginForm'
import { LoginAside } from './LoginAside'
import { LoginForm } from './LoginForm'
import { NameStepForm } from './NameStepForm'

export function LoginPanel() {
  const login = useLoginForm()
  const askingName = login.step === 'name'

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <LoginAside />

      <main className="relative flex flex-col px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          {/* The brand panel is hidden on small screens, so the logo moves here. */}
          <span className="flex items-center gap-2.5 lg:invisible">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-semibold">Trilha</span>
          </span>
          <ThemeToggle />
        </div>

        <div className="animate-fade-up mx-auto my-auto w-full max-w-sm py-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            {askingName ? 'Primeiro acesso' : 'Área do aluno'}
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            {askingName ? 'Como podemos te chamar?' : 'Entrar no portal'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {askingName ? (
              <>
                É a primeira vez que <span className="font-semibold text-foreground">{login.email.trim()}</span> entra
                por aqui. Diga seu nome para personalizarmos o portal.
              </>
            ) : (
              'Use o e-mail cadastrado na instituição para acessar suas notas, disciplinas e matrícula.'
            )}
          </p>

          {login.signedOut && !askingName && (
            <div className="mt-6">
              <Alert tone="success" title="Sessão encerrada com sucesso.">
                Entre novamente quando quiser.
              </Alert>
            </div>
          )}

          <div className="mt-8">
            {askingName ? (
              <NameStepForm
                name={login.name}
                error={login.nameError}
                submitting={login.submitting}
                onNameChange={login.setName}
                onBlur={login.blur('name')}
                onBack={login.back}
                onSubmit={login.submitName}
              />
            ) : (
              <LoginForm
                email={login.email}
                password={login.password}
                remember={login.remember}
                showPassword={login.showPassword}
                errors={login.errors}
                submitting={login.submitting}
                onEmailChange={login.setEmail}
                onPasswordChange={login.setPassword}
                onRememberChange={login.setRemember}
                onTogglePassword={login.togglePassword}
                onBlur={login.blur}
                onSubmit={login.submitCredentials}
              />
            )}
          </div>

          <p className="mt-8 rounded-xl border border-border bg-muted px-4 py-3 text-xs leading-5 text-muted-foreground">
            <span className="font-bold text-foreground">Ambiente de demonstração:</span> qualquer e-mail válido e
            senha com 6 ou mais caracteres dão acesso; no primeiro acesso de cada e-mail, pedimos seu nome. Nada é
            enviado a um servidor.
          </p>
        </div>
      </main>
    </div>
  )
}
