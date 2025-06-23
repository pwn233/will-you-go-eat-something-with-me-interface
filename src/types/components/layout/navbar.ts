import type { ROUTE_NAME } from '@/enums'
import type { IRoute } from '@/types'

export type INavItem = Pick<IRoute, 'path'> & { label: string }

export type INavList = Record<Exclude<ROUTE_NAME, ROUTE_NAME.HOME>, INavItem>
