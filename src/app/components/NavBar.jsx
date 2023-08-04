
import { useRouter } from 'next/navigation'
import React from 'react'

function NavBar() {
const router = useRouter();
    function onHandleSignOut(){
    
    }
    function onHandleClickProfile(){
        router.push('/dashboard/edit-profile');
    }
    function onHandleClickLinks(){
      router.push('/dashboard');
  }
  return (
    <div className='w-full backdrop-blur-3xl'>
        <ul className='flex justify-between w-full gap-2 p-2 px-3 font-semibold text-white '>
          <div className='flex gap-2'>
              <li><a onClick={onHandleClickLinks}><button className='p-2 rounded hover:bg-principal hover:text-white'>Links</button></a></li>
              <li><a onClick={onHandleClickProfile}><button className='p-2 rounded hover:bg-principal hover:text-white'>Perfil</button></a></li>
          </div>
            
              <li className='p-2 rounded hover:bg-principal hover:text-white' onClick={onHandleSignOut} >Cerrar sesion</li>
        </ul>
    </div>
  )
}

export default NavBar