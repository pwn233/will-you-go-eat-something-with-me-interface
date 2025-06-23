import type { PropsWithChildren, ReactNode, RefAttributes } from 'react'

export type IDialogVariants = {
  variant: 'default'
  size: 'default'
  animation: boolean
}

export type IDialogProps = RefAttributes<HTMLDialogElement> &
  PropsWithChildren<
    Partial<
      {
        trigger: ReactNode
      } & IDialogVariants
    > & {
      handleOpenChange: (val: boolean) => void
      open: boolean
    }
  >
