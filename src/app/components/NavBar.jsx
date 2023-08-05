
import { useRouter } from 'next/navigation'
import React from 'react'
import { exit } from '../firebase/firebase';

function NavBar() {
const router = useRouter();
    async function onHandleSignOut(){
     await exit();
     router.push('/login')
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
              <li><a onClick={onHandleClickLinks}><button className='p-2 rounded hover:bg-principal hover:text-white'>Dashboard</button></a></li>
              <li><a onClick={onHandleClickProfile}><button className='p-2 rounded hover:bg-principal hover:text-white'>Editar Perfil</button></a></li>
          </div>     
          <li><a onClick={onHandleSignOut}><button className='p-2 rounded hover:bg-principal hover:text-white'>Cerrar Sesión</button></a></li>
        </ul>
    </div>
  )
}

export default NavBar