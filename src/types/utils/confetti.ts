import type { Shape } from 'canvas-confetti'

export type IShootConfettiOptions = Partial<{
  particleCount: number
  shapes: Array<Shape>
}>
