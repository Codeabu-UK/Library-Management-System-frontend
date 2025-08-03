import { Outlet } from "react-router-dom"
import Navbar from "../../reuseable-comonents/Navbar"

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout