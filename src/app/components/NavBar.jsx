
import { useRouter } from 'next/navigation'
import React from 'react'
import { exit, getUserInfo } from '../firebase/firebase';
import { getUserPublicProfileUser } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import Menu from './Menu';

function NavBar() {
const router = useRouter();

    async function onHandleSignOut(){
    await exit();
    router.push('/')
    }
    function onHandleClickProfile(){
        router.push('/dashboard/edit-profile');
    }
    function onHandleClickLinks(){
      router.push('/dashboard');
  }
  async function onHandleClickPublicProfile(){
    const uid = auth.currentUser.uid;
    const data = await getUserPublicProfileUser(uid);
    const username = data.profileInfo.username;
    router.push(`/user/${username}`)   
  }
  return (
    <div className='flex flex-col w-full'>
    <div className='hidden w-full md:block backdrop-blur-3xl'>
        <ul className='flex justify-between w-full gap-2 p-2 px-3 font-semibold text-white '>
          <div className='flex gap-2'>
              <li><a onClick={onHandleClickLinks}><button className='p-2 rounded hover:bg-principal hover:text-white'>Dashboard</button></a></li>
              <li><a onClick={onHandleClickProfile}><button className='p-2 rounded hover:bg-principal hover:text-white'>Editar Perfil</button></a></li>
              <li><a onClick={onHandleClickPublicProfile}><button className='p-2 rounded hover:bg-principal hover:text-white'>Ver Perfil Público</button></a></li>
          </div>     
          <li><a onClick={onHandleSignOut}><button className='p-2 rounded hover:bg-principal hover:text-white'>Cerrar Sesión</button></a></li>
        </ul>
    </div>
    <Menu/>
    </div>
  )
}

export default NavBar