import Link from "next/link"

import '@styles/navbar.css'
import { Button } from "@mui/material"

const Navbar = () => {
  return (
    <header className="fade">
        <h2 className="logo pan">
          <div>AI PROJECTS</div>
        </h2>

        <nav>
          <ul className="nav-links">
            <li  className="pan"><Link href='/projects'>ALL</Link></li>
            <li className="pan d1"><Link href='/projects?type=img'>Images</Link></li>
            <li className="pan d1"><Link href='/projects?type=lng'>Languages</Link></li>
          </ul>
        </nav>

        <div className="buttons">
            <Button>Github</Button>
        </div>
    </header>
  )
}

export default Navbar