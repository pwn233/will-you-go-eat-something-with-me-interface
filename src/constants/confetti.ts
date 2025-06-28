import type { Options, Shape } from 'canvas-confetti'
import confetti from 'canvas-confetti'

const { shapeFromText }: typeof confetti = confetti

export const DEFAULT_SCALAR: number = 2

export const DEFAULT_SHAPES: Array<Shape> = [shapeFromText({ text: '🦄', scalar: DEFAULT_SCALAR })]

export const DEFAULT_CONFETTI_OPTIONS: Partial<Options> = {
  spread: 360,
  ticks: 60,
  gravity: 0,
  decay: 0.96,
  startVelocity: 20,
  scalar: DEFAULT_SCALAR,
}

export const SUCCESS_SHAPES: Array<Shape> = [
  shapeFromText({ text: '💖', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '❤️', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '💛', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '💚', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '💙', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '💜', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '💖', scalar: DEFAULT_SCALAR }),
  shapeFromText({ text: '💖', scalar: DEFAULT_SCALAR }),
]
