import React from 'react'
import {PiGithubLogo} from 'react-icons/pi'

function Footer() {
  return (
    
    <div className='relative bottom-0 left-0 right-0 flex items-center justify-center w-full sm:absolute '>
            <p className='p-3 text-center text-white text-md md:text-xl font-extralight'>Creado por <span className='p-1 hover:bg-principal'><a target="_blank" href="https://github.com/Eliasivang">Elias Gonzalez</a></span></p>
            <PiGithubLogo color='white' className='text-lg md:text-2xl'/>
    </div>
  )
}

export default Footer