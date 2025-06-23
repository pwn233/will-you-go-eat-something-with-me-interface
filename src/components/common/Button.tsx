import { Slot } from '@radix-ui/react-slot'
import { useMemo } from 'react'

import type { IButtonProps, IButtonVariants, ICompVariantConfig } from '@/types'
import { tv } from '@/utils'

const buttonVariants: ICompVariantConfig<IButtonVariants> = tv({
  base: 'disabled:bg-button-disabled border-primary-800 box-border shrink-0 whitespace-nowrap rounded-md border text-black transition-colors hover:cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:border-none disabled:border-transparent disabled:text-black/30 data-[disabled=true]:pointer-events-none',
  variants: {
    block: {
      true: 'block w-full',
      false: 'inline-block w-fit',
    },
    variant: {
      secondary: 'bg-secondary-500 hover:bg-secondary-600 text-secondary-800',
      vanilla: 'border-transparent',
      success: 'bg-button-success hover:bg-button-success-hover',
      danger: 'bg-button-danger hover:bg-button-danger-hover',
    },
    size: {
      default: '!text-heading-5 px-3 py-2',
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'default',
  },
  compoundVariants: [
    {
      variant: 'vanilla',
      className: 'size-auto !p-0',
    },
  ],
})

export const Button = ({
  className,
  variant,
  size = 'default',
  block = false,
  asChild = false,
  children,
  ...props
}: IButtonProps) => {
  const buttonClassName: string = useMemo<string>(
    (): string => buttonVariants({ block, variant, size, className }),
    [block, variant, size, className],
  )

  if (asChild) {
    return (
      <Slot className={buttonClassName} data-disabled={props.disabled} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button className={buttonClassName} disabled={props.disabled} {...props}>
      {children}
    </button>
  )
}
