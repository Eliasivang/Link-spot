
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
    <div className='w-full bg-white'>
        <ul className='flex w-full gap-4 p-4 px-2 font-semibold text-black '>
            <li><a onClick={onHandleClickProfile}><button>Perfil</button></a></li>
            <li><a onClick={onHandleClickLinks}><button>Links</button></a></li>
            <li onClick={onHandleSignOut} >Cerrar sesion</li>
        </ul>
    </div>
  )
}

export default NavBar