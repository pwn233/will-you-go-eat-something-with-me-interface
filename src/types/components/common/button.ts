import type { ButtonHTMLAttributes, RefAttributes } from 'react'

export type IButtonVariants = {
  variant: 'primary' | 'secondary' | 'vanilla' | 'success' | 'danger'
  size: 'default'
  block: boolean
}

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<IButtonVariants>,
    RefAttributes<HTMLButtonElement> {
  asChild?: boolean
}
