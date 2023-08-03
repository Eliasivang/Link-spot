'use client'
import Image from 'next/image'
import {FcGoogle} from "react-icons/fc"
import { auth, userExists } from '../firebase/firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthProvider from '../components/AuthProvider'

export default function Home() {
const [currentUser,setCurrentUser] = useState(null)
const [state,setState] = useState(0)
const router = useRouter()
/*
0: inicializando
1: loading
2:login  completo
3:login pero sin registro
4:no hay nadie logueado
5: ya existe el username
*/

const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider)
    async function signInWithGoogle(googleProvider){
        try {
            const res = await signInWithPopup(auth,googleProvider)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
}

function handleUserLoggedIn (user){
    router.push("./dashboard")
}
function hanldeOnUserNotLoggedIn(user){
    setState(4)
}
function handleUserNotRegistered (user){
    router.push("./choose-username")
}



if(state===4){
    return (
        <main className="flex flex-col items-center justify-between min-h-screen p-24">
            <button onClick={handleOnClick} className='flex items-center justify-center w-full gap-2 p-3 my-2 text-base text-black bg-white rounded-xl'> <span><FcGoogle size={25}/></span>Ingresar con Google</button>
        </main>
    )       
} 

return <AuthProvider 
    onUserLoggedIn={handleUserLoggedIn} 
    onUserNotLoggedIn={hanldeOnUserNotLoggedIn} 
    onUserNotRegistered={handleUserNotRegistered}>
    </AuthProvider>


}


