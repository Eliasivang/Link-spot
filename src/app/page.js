'use client'
import {FcGoogle} from "react-icons/fc"
import { auth } from "./firebase/firebase"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthProvider from "./components/AuthProvider"
import demo from './assets/demo.png'
import Header from './components/Header'
import Image from "next/image"
import Footer from "./components/Footer"

export default function Login() {
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
        <>
        <Header/>
        <main className="flex flex-col items-center justify-center w-full px-2 text-white md:my-8 ">
            <div className="w-full md:w-[800px]">
            <div className="block gap-2 mb-8 md:flex">
                <p className='p-2 text-[27px] md:text-[40px] font-semibold '>Crea tu cuenta y guarda todos tus <span className="font-bold text-violet-700">links</span> en un solo lugar.</p>
                <Image className="w-full h-full shadow-2xl md:w-8/12 shadow-black rounded-2xl" src={demo} alt="demo-image" />

            </div>
            <button onClick={handleOnClick} className='flex items-center justify-center w-full gap-2 p-3 my-2 text-base text-black bg-white rounded-xl'> <span><FcGoogle size={25}/></span>Iniciar sesion con Google</button>
            </div>
        </main>
        <Footer/>
        </>
    )       
} 

return <AuthProvider 
    onUserLoggedIn={handleUserLoggedIn} 
    onUserNotLoggedIn={hanldeOnUserNotLoggedIn} 
    onUserNotRegistered={handleUserNotRegistered}>
    </AuthProvider>
}
