import type { PropsWithChildren } from 'react'

type IInfoProps = PropsWithChildren<{
  title: string
}>

export const Info = ({ title, children }: IInfoProps) => {
  return (
    <div className="bg-primary-400 flex flex-col gap-y-4 rounded-lg p-4">
      <h3 className="text-secondary-700 capitalize">{title}</h3>
      {children}
    </div>
  )
}
