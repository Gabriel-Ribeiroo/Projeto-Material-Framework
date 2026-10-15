/**
 * Indeterminate circular progress. Inherits the text colour, so it matches
 * whatever surface it sits on. Decorative: the caller announces the busy state.
 */
export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" aria-hidden className={`animate-spin shrink-0 ${className}`}>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="animate-spin-arc"
      />
    </svg>
  )
}
