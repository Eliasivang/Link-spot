import React from 'react'
import Image from 'next/image'
import logo from '../assets/linkspot.png'


function Header() {
return (
    <>
    <div className='flex items-center justify-center px-10 my-4'>
        <Image src={logo} alt='linkspotLogo'/>
    </div>
    </>
    )
}

export default Header