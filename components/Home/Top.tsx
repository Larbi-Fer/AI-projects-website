'use client'

import '@styles/Home_top.css'

import { useEffect } from 'react'
import { Button, Input } from "@mui/material"

const Top = () => {

  useEffect(() => {
    var section = document.getElementById('all')
    if(!section) return

    section.onscroll = e => {
      if (!section) return
      if (section.scrollTop > 120) section.children[0].classList.add('small')
      else section.children[0].classList.remove('small')
    }
  }, [])

  return (
    <section className="main">
      <div className='content'>
        <div>
          <Input title="Search" placeholder="Happy/Sad model" />
        </div>
        <div>
          <Button variant='contained'>Test</Button>
        </div>
      </div>
    </section>
  )
}

export default Top