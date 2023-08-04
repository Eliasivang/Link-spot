'use client'
import { useRouter } from 'next/navigation'
import AuthProvider from '../components/AuthProvider'
import React, { useState } from 'react'
import { existsUsername, updateUser } from '../firebase/firebase'


function page() {
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
      }else{
        const tmp = {...currentUser};
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
      }
  }
}

if(state ==3 || state==5 ){
  return (
    <div>
    <h1>Elige tu nombre de usaurio {currentUser.displayName}</h1>
    <div>
        <input type="text" onChange={handleOnChange} placeholder='Jane Doe' />
    </div>
    {state == 5 ? <p>El nombre de usuario ya existe, escoge otro</p>: ""}
    <div>
      <button onClick={handleOnClick}>Continuar</button>
    </div>
  </div>
  )
}


  return <AuthProvider 
  onUserLoggedIn={handleUserLoggedIn} 
  onUserNotLoggedIn={hanldeOnUserNotLoggedIn} 
  onUserNotRegistered={handleUserNotRegistered}>
  </AuthProvider>
}

export default page