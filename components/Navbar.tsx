'use client'

import Link from "next/link"

import '@styles/navbar.css'
import { Button } from "@mui/material"
import { useRef } from "react"
import BackBox from "./material/BackBox"

import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const listRef = useRef<HTMLUListElement>(null)

  const showList = () => {
    listRef.current?.classList.toggle('show')
    const box = document.getElementById('back-box')
    box?.classList.toggle('show')
    }
    
  const hideList = () => {
    listRef.current?.classList.remove('show')
  }

  return (
    <>
      <header className="fade small">
          <h2 className="logo pan">
            <div>AI PROJECTS</div>
          </h2>

          <nav>
            <ul className="nav-links" ref={listRef}>
              <li  className="pan"><Link href='/projects'>ALL</Link></li>
              {/* temporary */}
              <li className="pan d1"><Link href='/happysad'>Images</Link></li>
              <li className="pan d1"><Link href='/projects?type=lng'>Languages</Link></li>
            </ul>
          </nav>

          <div className="buttons">
              <Link href='https://github.com/Larbi-Fer' target="_blank">
                <Button>Github</Button>
              </Link>
              <span className="show-list" onClick={showList}>
                <MenuIcon />
              </span>
          </div>
      </header>

      <BackBox onClick={hideList} />
    </>
  )
}

export default Navbar