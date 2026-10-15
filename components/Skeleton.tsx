/**
 * Placeholder block used to outline content that is still loading.
 * Sizing and radius come from utility classes: `<Skeleton className="h-4 w-24" />`.
 */
export function Skeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`skeleton ${className}`} />
}
