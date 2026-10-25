/**
 * First stop of the Tab order: lets keyboard users jump over the sidebar and
 * header straight to the page content. Parked above the viewport and slides
 * in when it receives focus.
 */
export function SkipLink({ targetId }: { targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="focus-ring fixed left-4 top-4 z-70 -translate-y-24 rounded-xl bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-lg transition-transform duration-200 ease-in focus:translate-y-0 focus:ease-out"
    >
      Pular para o conteúdo
    </a>
  )
}
