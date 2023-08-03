'use client'
import React from 'react'
import NavBar from '../components/NavBar'

function layaout({children}) {
  
  return (
    <>
        <ul className='flex justify-between w-full'>
            <NavBar/>
        </ul>
        {children}
    
    </>
   

  )
}

export default layaout