import { Link, type Location, useLocation } from 'react-router-dom'

import { Button } from '@/components/common'
import { ROUTES } from '@/constants'
import { ROUTE_NAME } from '@/enums'
import type { INavItem, INavList } from '@/types'
import { cn } from '@/utils'

const NAV_LIST: INavList = {
  [ROUTE_NAME.CREATE]: {
    path: ROUTES.CREATE.path,
    label: 'Create',
  },
  [ROUTE_NAME.PLAY]: {
    path: ROUTES.PLAY.path,
    label: 'Play',
  },
}

export const NavBar = () => {
  // hooks
  const { pathname }: Location = useLocation()

  return (
    <div className="bg-primary-400 sticky top-0 z-20 flex h-[var(--header-height)] w-full flex-row items-center justify-between gap-x-10 px-3">
      <a href="/" className="text-heading-4 hover:text-secondary-700 hidden cursor-pointer text-black sm:block">
        🩷 Will you go eating something with me ?
      </a>
      <a href="/" className="text-heading-4 hover:text-secondary-700 block cursor-pointer text-black sm:hidden">
        🩷
      </a>
      <div className="flex w-fit flex-row items-center justify-center gap-x-4">
        {Object.values(NAV_LIST).map(({ path, label }: INavItem) => (
          <Button
            key={label}
            asChild
            variant="vanilla"
            className={cn('hover:text-secondary-700', [pathname.includes(path) && 'text-secondary-700 cursor-default'])}
            disabled={pathname.includes(path)}
          >
            <Link to={path}>{label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
