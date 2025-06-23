import confetti from 'canvas-confetti'

import { DEFAULT_CONFETTI_OPTIONS, DEFAULT_SCALAR, DEFAULT_SHAPES, SUCCESS_SHAPES } from '@/constants'
import type { IShootConfettiOptions } from '@/types'

const shootConfetti = ({ particleCount = 30, shapes = DEFAULT_SHAPES }: IShootConfettiOptions) => {
  confetti({ ...DEFAULT_CONFETTI_OPTIONS, particleCount, shapes })

  confetti({
    ...DEFAULT_CONFETTI_OPTIONS,
    particleCount: particleCount * 0.16,
    flat: true,
    shapes,
  })

  confetti({
    ...DEFAULT_CONFETTI_OPTIONS,
    particleCount: particleCount * 0.5,
    scalar: DEFAULT_SCALAR / 2,
    shapes,
  })
}

export const shootSuccessConfetti = () => {
  setTimeout(() => shootConfetti({ particleCount: 100, shapes: SUCCESS_SHAPES }), 0)
  setTimeout(() => shootConfetti({ particleCount: 100, shapes: SUCCESS_SHAPES }), 100)
  setTimeout(() => shootConfetti({ particleCount: 100, shapes: SUCCESS_SHAPES }), 200)
}
