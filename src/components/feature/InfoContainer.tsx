import type { PropsWithChildren } from 'react'

type IInfoProps = PropsWithChildren<{
  title: string
}>

export const InfoContainer = ({ title, children }: IInfoProps) => {
  return (
    <div className="bg-primary-400 flex flex-col gap-y-4 rounded-lg p-4">
      {title && <h4 className="sm:text-heading-3 text-secondary-900/90 capitalize">{title}</h4>}
      {children}
    </div>
  )
}
