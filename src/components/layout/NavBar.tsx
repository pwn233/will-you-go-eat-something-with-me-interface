import { Link } from 'react-router-dom'

import { Button } from '@/components/common'
import { ROUTES } from '@/constants'
import { ROUTE_NAME } from '@/enums'
import type { INavItem, INavList } from '@/types'

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
  return (
    <div className="bg-primary-400 sticky top-0 z-20 flex h-[var(--header-height)] w-full flex-row items-center justify-between gap-x-10 px-3">
      <a href="/" className="text-heading-4 hover:text-secondary-700 text-black">
        🩷 Will you go eating something with me ?
      </a>
      <div className="flex w-fit flex-row items-center justify-center gap-x-4">
        {Object.values(NAV_LIST).map(({ path, label }: INavItem) => (
          <Button key={label} asChild variant="vanilla" className="hover:text-secondary-700">
            <Link to={path}>{label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
