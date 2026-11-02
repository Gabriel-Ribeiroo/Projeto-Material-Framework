import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { IconButton } from '@/components/IconButton'
import { LoginField, LoginFormErrors } from '../hooks/useLoginForm'

type LoginFormProps = {
  email: string
  password: string
  remember: boolean
  showPassword: boolean
  errors: LoginFormErrors
  submitting: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onRememberChange: (value: boolean) => void
  onTogglePassword: () => void
  onBlur: (field: LoginField) => () => void
  onSubmit: (event: FormEvent) => void
}

export function LoginForm({
  email,
  password,
  remember,
  showPassword,
  errors,
  submitting,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onTogglePassword,
  onBlur,
  onSubmit,
}: LoginFormProps) {
  return (
    // Validation is ours (inline messages), so the browser's bubbles are turned off.
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field
        label="E-mail"
        icon={Mail}
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="nome@email.com"
        value={email}
        onChange={onEmailChange}
        onBlur={onBlur('email')}
        error={errors.email}
        disabled={submitting}
        required
      />
      <Field
        label="Senha"
        icon={Lock}
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="Mínimo de 6 caracteres"
        value={password}
        onChange={onPasswordChange}
        onBlur={onBlur('password')}
        error={errors.password}
        disabled={submitting}
        required
        trailing={
          <IconButton label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={onTogglePassword}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </IconButton>
        }
      />

      <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm font-medium text-foreground has-disabled:cursor-not-allowed has-disabled:opacity-60">
        <input
          type="checkbox"
          checked={remember}
          onChange={event => onRememberChange(event.target.checked)}
          disabled={submitting}
          className="focus-ring h-4 w-4 cursor-pointer rounded accent-primary disabled:cursor-not-allowed"
        />
        Manter conectado
      </label>

      <Button type="submit" icon={LogIn} loading={submitting} loadingLabel="Entrando…" fullWidth className="py-3">
        Entrar
      </Button>
    </form>
  )
}
