'use client'

import { useTransform, type MotionValue } from 'framer-motion'

/* Shared timing for scroll-driven "one card at a time" stacks (testimonials,
   references, ...). Each item gets a 20% fade-in / 60% fully-still hold /
   20% fade-out split of its 1/n slice of the overall scroll range, and a
   card's fade-out ends exactly where the next card's fade-in begins — so
   only one card is ever visible at a time. Without this exact handoff, a
   card's hold period overlaps the next card's fade-in and both are visible
   together, showing double-exposed text. */
export function useStackCardTransforms(progress: MotionValue<number>, i: number, n: number) {
  const w       = 1 / n
  const fadeIn  = (i - 0.2) * w
  const settled = i * w
  const holdEnd = (i + 0.6) * w
  const gone    = (i + 0.8) * w
  const isLast  = i === n - 1
  const range   = isLast ? [fadeIn, settled] : [fadeIn, settled, holdEnd, gone]

  const y       = useTransform(progress, range, isLast ? [56, 0]   : [56, 0, 0, -72])
  const rotate  = useTransform(progress, range, isLast ? [-3, 0]   : [-3, 0, 0, 3])
  const scale   = useTransform(progress, range, isLast ? [0.94, 1] : [0.94, 1, 1, 0.96])
  const opacity = useTransform(progress, range, isLast ? [0, 1]    : [0, 1, 1, 0])
  // Every card sits absolutely stacked on top of the others, so an invisible
  // card (opacity 0) with a higher z-index would otherwise still intercept
  // clicks meant for whichever card is actually showing underneath it.
  const pointerEvents = useTransform(opacity, v => (v > 0.05 ? 'auto' : 'none'))

  return { y, rotate, scale, opacity, pointerEvents }
}
