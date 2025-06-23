import { ROUTE_NAME } from '@/enums'
import type { IRoute } from '@/types'

export const ROUTES: Record<ROUTE_NAME, IRoute> = {
  [ROUTE_NAME.HOME]: {
    path: '/',
  },
  [ROUTE_NAME.CREATE]: {
    path: '/create',
  },
  [ROUTE_NAME.PLAY]: {
    path: '/play',
  },
}
