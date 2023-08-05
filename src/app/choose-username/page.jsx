'use client'
import { useRouter } from 'next/navigation'
import AuthProvider from '../components/AuthProvider'
import React, { useState } from 'react'
import { existsUsername, updateUser } from '../firebase/firebase'
import Header from '../components/Header'


function ChooseUsername() {
const [state,setState] = useState()
const router = useRouter()
const [currentUser,setCurrentUser] = useState({})
const [username,setUsername] = useState(' ')
  function handleUserLoggedIn (){
    router.push("/dashboard")
}
function hanldeOnUserNotLoggedIn(){
    router.push("/login");
}
function handleUserNotRegistered (user){
    setCurrentUser(user);
    setState(3);
}

function handleOnChange(e){
  setUsername(e.target.value.trim());
}

async function handleOnClick(){
  if(username !== " "){
      const exists = await existsUsername(username);
      if(exists){
        setState(5)
        setTimeout(()=>{
          setState(3)
      },3000)
        
      }else{
        const tmp = {...currentUser};
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        router.push('/dashboard')
      }
  }
}

if(state ==3 || state==5 ){
  return (
    
    <section className='flex flex-col items-center w-full gap-4 px-2'>
        
        <h2 className='md:w-[700px] w-full text-lg px-2 text-white'>Para terminar con el registro elige un nombre de usuario {currentUser.displayName}</h2>     
        <div className='md:w-[700px] w-full bg-black bg-opacity-60 p-4 flex flex-col gap-4 rounded'>        
            <div className='flex flex-col gap-4 '>  
                <label className='text-xl font-bold text-white'>Nombre de usuario: </label>
                <input className='p-3 rounded outline-none' type="text" onChange={handleOnChange} placeholder='Jane Doe' />
            </div>
            {state == 5 ? <p className='my-2 text-red-500 '>El nombre de usuario ya existe, escoge otro</p>: ""}
        <div>
            <button className='p-3 font-semibold text-white rounded bg-principal' onClick={handleOnClick}>Continuar</button>
        </div>
        </div>
        

  </section>
  )
}


  return <AuthProvider 
  onUserLoggedIn={handleUserLoggedIn} 
  onUserNotLoggedIn={hanldeOnUserNotLoggedIn} 
  onUserNotRegistered={handleUserNotRegistered}>
     <div className='flex justify-center w-full my-20'>
        <div className="loader"></div>
     </div>
  </AuthProvider>
}

export default ChooseUsername