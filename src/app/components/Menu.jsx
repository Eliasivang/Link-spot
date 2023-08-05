import React, { useState } from 'react'
import {HiMenu} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { exit} from '../firebase/firebase';
import { getUserPublicProfileUser } from '../firebase/firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { auth } from '../firebase/firebase';

function Menu() {
const router = useRouter();
const [open,setOpen]=useState(false)




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
    function handleOnOpenMenu(){
    if(open){
        setOpen(false)
    }else{setOpen(true)}
    

    }
return (
    <div className='relative flex flex-col items-end w-full md:hidden'>
        <div className='flex justify-end w-full p-2 bg-black bg-opacity-70'>
            <HiMenu onClick={handleOnOpenMenu} color='white' size={40}/>
        </div>
    <AnimatePresence>
    {open &&
    <div className='relative w-full'>
        <motion.ul
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{ opacity: 0 }}
        className='absolute top-0 right-0 flex flex-col justify-end w-1/2 gap-2 p-2 px-3 font-semibold text-white bg-black rounded-b-xl bg-opacity-70 text-end '>
            <li><a onClick={onHandleClickLinks}><button className='p-2 rounded hover:bg-principal hover:text-white'>Dashboard</button></a></li>
            <li><a onClick={onHandleClickProfile}><button className='p-2 rounded hover:bg-principal hover:text-white'>Editar Perfil</button></a></li>
            <li><a onClick={onHandleClickPublicProfile}><button className='p-2 rounded hover:bg-principal hover:text-white'>Ver Perfil Público</button></a></li>
            <li><a onClick={onHandleSignOut}><button className='p-2 rounded hover:bg-principal hover:text-white'>Cerrar Sesión</button></a></li>
        </motion.ul>
    </div>
    }
    </AnimatePresence>  
    
    </div>
    )
}

export default Menu