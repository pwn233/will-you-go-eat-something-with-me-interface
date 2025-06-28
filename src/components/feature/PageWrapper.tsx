import type { PropsWithChildren } from 'react'

import { cn } from '@/utils'

export const PageWrapper = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn('mx-auto flex h-full flex-col gap-y-4 p-4 lg:w-[80%] xl:w-[60%]', className)}>{children}</div>
  )
}
