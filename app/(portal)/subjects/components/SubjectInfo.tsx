import { ComponentType } from 'react'

type SubjectInfoProps = {
  icon: ComponentType<{ className?: string }>
  text: string
}

export function SubjectInfo({ icon: Icon, text }: SubjectInfoProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <Icon className="h-4 w-4 text-muted-foreground" />
      {text}
    </div>
  )
}
