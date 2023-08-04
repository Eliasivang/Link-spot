import React from 'react'
import Image from 'next/image'
import logo from '../assets/linkspot.png'


function Header() {
return (
    <>
    <div className='flex items-center justify-center px-10'>
        <Image width={300} height={200} src={logo} alt='linkspotLogo'/>
    </div>
    </>
    )
}

export default Header