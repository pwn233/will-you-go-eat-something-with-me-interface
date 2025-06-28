import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import CreatePage from '@/pages/create'
import HomePage from '@/pages/home'
import PlayPage from '@/pages/play'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <ScrollRestoration />
          <Layout />
          <ToastContainer
            toastClassName="!bg-primary-300 !text-body-2 !font-bold !w-fit !whitespace-pre-line"
            closeButton={false}
            stacked
            closeOnClick
          />
        </>
      ),
      children: [
        {
          path: ROUTES.HOME.path,
          element: <HomePage />,
        },
        {
          path: ROUTES.CREATE.path,
          element: <CreatePage />,
        },
        {
          path: ROUTES.PLAY.path,
          element: <PlayPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
