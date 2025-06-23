import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { OutletWrapper } from './OutletWrapper'

const Layout = () => {
  return (
    <div className="bg-page relative min-h-screen">
      <NavBar />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </div>
  )
}

export default Layout
