import { Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-alert-dialog'
import { Root as VisuallyHiddenRoot } from '@radix-ui/react-visually-hidden'
import { useCallback, useEffect, useMemo, type WheelEvent } from 'react'

import type { ICompVariantConfig, IDialogProps, IDialogVariants } from '@/types'
import { tv } from '@/utils'

const drawerContentVariants: ICompVariantConfig<IDialogVariants> = tv({
  base: 'bg-primary-500 fixed left-1/2 top-1/2 z-50 flex max-h-[95dvh] max-w-[95dvw] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-xl border border-black/60 p-6 shadow-lg',
  variants: {
    variant: {
      default: '',
    },
    size: {
      default: 'w-110',
    },
    animation: {
      true: '',
      false: '!duration-0',
    },
  },
  defaultVariants: {
    size: 'default',
    animation: true,
  },
})

export const Dialog = ({
  children,
  trigger,
  open,
  handleOpenChange,
  size = 'default',
  animation = true,
  ...props
}: IDialogProps) => {
  const dialogContentClassname: string = useMemo((): string => {
    return drawerContentVariants({ size, animation })
  }, [size, animation])

  const handleWheel: (e: WheelEvent<HTMLDivElement>) => void = useCallback((e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    document.body.style.pointerEvents = open ? '' : 'auto'
    return () => {
      if (open) document.body.style.pointerEvents = 'auto'
    }
  }, [open])

  return (
    <Root {...props} open={open} onOpenChange={handleOpenChange}>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Content className={dialogContentClassname} onWheel={handleWheel}>
          <VisuallyHiddenRoot>
            <Title />
            <Description />
          </VisuallyHiddenRoot>
          <div className="text-body-1 flex w-full grow flex-col gap-4 overflow-auto">{children}</div>
        </Content>
      </Portal>
    </Root>
  )
}
