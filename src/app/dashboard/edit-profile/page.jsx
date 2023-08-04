'use client'
import React, { useRef, useState } from 'react'
import AuthProvider from '../../components/AuthProvider'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from '../../firebase/firebase';


function page() {
const router = useRouter();
const fileRef = useRef(null);
const [currentUser,setCurrentUser] = useState({}) 
const [profileUrl,setProfileUrl] = useState(undefined);
const [state,setState] = useState(0);

    async function handleUserLoggedIn (user){
        setCurrentUser(user);
        const url = await getProfilePhotoUrl(user.profilePicture);
        setProfileUrl(url)
        setState(2);
    }
    function hanldeOnUserNotLoggedIn(){
        router.push("/login");
    }
    function handleUserNotRegistered (user){
        router.push("/login");
    }

    function handleOpenFilePicker(){
        if(fileRef.current){
            fileRef.current.click(); //cuando hacemos click tomamos el input de referencia y llamamos al click, el input lo ocultamos con css
        }
    }
    function handleOnChangeFile(e){
        const files = e.target.files;
        const fileReader = new FileReader(); // API para decodifiar el archivo en un arreglo de bytes.
        if(fileReader && files && files.length > 0){
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function (){
                const imageData = fileReader.result;
                const res = await setUserProfilePhoto(currentUser.uid, imageData);
                if(res){
                    const tmpUser = {...currentUser};
                    tmpUser.profilePicture = res.metadata.fullPath
                    await updateUser({...tmpUser});
                    const url = await getProfilePhotoUrl(currentUser.profilePicture);
                    setProfileUrl(url);
                }
            }
        }
    }
    if(state!==2){
        return (
            <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered} 
            onUserNotLoggedIn={hanldeOnUserNotLoggedIn}>
            <div className='flex justify-center w-full my-20'>
            <div className="loader"></div>
            </div>
            </AuthProvider>
        )
    }
    
  return (
<>
    
    <div>
        <div className='flex items-center justify-center my-6 '>
            <Image className='rounded' width={200} height={200} src={profileUrl} alt='profileImage'/>
        </div>
        <div className='flex justify-center'>
            <button onClick={handleOpenFilePicker} className='p-2 font-semibold text-black bg-white rounded hover:bg-principal hover:text-white'>Elige una nueva foto de perfil</button>
            <input className='hidden' type="file" ref={fileRef} onChange={handleOnChangeFile} />
        </div>
    </div>
</>
)
}

export default page