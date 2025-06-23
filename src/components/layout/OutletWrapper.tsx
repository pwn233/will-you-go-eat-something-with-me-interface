import type { PropsWithChildren } from 'react'

export const OutletWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-[calc(100dvh-var(--header-height)-var(--footer-height))] overflow-y-auto">{children}</div>
  )
}
