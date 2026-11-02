import Image from 'next/image'

/** Recolored unDraw illustrations: one file per theme, in `public/illustrations`. */
const illustrations = {
  empty: { width: 651, height: 800 },
  error: { width: 960, height: 719 },
  'not-found': { width: 960, height: 746 },
}

export type IllustrationName = keyof typeof illustrations

type IllustrationProps = {
  name: IllustrationName
  className?: string
}

/**
 * Decorative illustration that follows the color theme. Both versions are in
 * the markup; the hidden one is lazy, so the browser only downloads one.
 */
export function Illustration({ name, className = '' }: IllustrationProps) {
  const { width, height } = illustrations[name]

  return (
    <>
      <Image src={`/illustrations/${name}-light.svg`} alt="" width={width} height={height} className={`dark:hidden ${className}`} />
      <Image src={`/illustrations/${name}-dark.svg`} alt="" width={width} height={height} className={`hidden dark:block ${className}`} />
    </>
  )
}
