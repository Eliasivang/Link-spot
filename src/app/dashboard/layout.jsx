'use client'
import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'

function layaout({children}) {
  
  return (
    <>  
        <Header/>
        <ul className='flex justify-between w-full'>
         <NavBar/>
        </ul>
        {children}
    
    </>
   

  )
}

export default layaout