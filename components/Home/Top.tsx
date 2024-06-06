'use client'

import '@styles/Home_top.css'

import React, { useEffect, useState } from 'react'
import { Button, SxProps, TextField, Theme } from "@mui/material"

const Top = () => {

  const [search, setSearch] = useState('')

  useEffect(() => {
    var section = document.getElementById('all')
    if(!section) return

    section.onscroll = e => {
      if (!section) return
      if (section.scrollTop > 150) section.children[0].classList.add('small')
      else section.children[0].classList.remove('small')
    }
  }, [])

  const handleSearch = (e : React.FormEvent) => {
    e.preventDefault();
    console.log(search);
  }

  return (
    <section className="main">
      <div className='content'>
        <div className="text">
          Search for any model
        </div>
        <form className='search' onSubmit={handleSearch}>
          <TextField placeholder="Search ..." variant='outlined' sx={textFieldStyle} value={search} onChange={e => setSearch(e.target.value)} name="q" />
          <Button variant='contained' type='submit' sx={buttonStyle}>Search</Button>
        </form>
      </div>
    </section>
  )
}

const textFieldStyle : SxProps<Theme> = { width: '100%' }
const buttonStyle : SxProps<Theme> = { 
  position: 'absolute',
  margin: '10px 10px',
  right: '0px'
}

export default Top