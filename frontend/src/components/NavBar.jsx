import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'


function NavBar() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <li></li>
        <Link to='/' >home</Link>
        <Link to='/login' >login</Link>
        <Link to='/register' >register</Link>
        

      </nav>
      <Outlet/>
    </>
  )
}

export default NavBar
