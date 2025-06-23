type IBaseRoute = {
  path: `/${string}`
}

interface IRedirectRoute extends IBaseRoute {
  getUrl: (value: string) => string
}

export type IRoute = IBaseRoute | IRedirectRoute
