'use client'
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/app/components/Footer';
import {BiLinkExternal} from 'react-icons/bi'
import { motion } from "framer-motion"
import  { useEffect, useState } from 'react'
import { existsUsername,getProfilePhotoUrl,getUserPublicProfileUser} from '@/app/firebase/firebase';

function PublicPage() {
    const params = useParams();
    const [profile,setProfile] = useState(null);
    const [url,setUrl] = useState('');
    const [state,setState] = useState(0);
    const router = useRouter();
    function onHandleCreateAccount(){
        router.push('/')
    }
    useEffect(()=>{  
        getProfile();
        async function getProfile(){
            const username = params.username;    
            try {          
                const userUid= await existsUsername(username);
                console.log(userUid)
                if(userUid){
                    const userInfo = await getUserPublicProfileUser(userUid);
                    setProfile(userInfo);
                    console.log(profile)
                    const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);                  
                    setUrl(url);
                    setState(6);
                    console.log(url)
                }else{setState(7)}
            }catch (error) {
                console.error(error);
            }
        }
    },[]);
    
    if(state===0){
        return (
            <div className='flex items-center justify-center w-full h-screen '>
                <div className="loader"></div>
            </div> 
        )
    }
    
    if(state===7){
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <h2 className='my-10 text-5xl font-semibold text-center text-white font'>Ups!Este usuario no existe</h2>
            </div>
        )
    }
    if(profile){
        return (
            <main className='flex flex-col items-center justify-center w-full px-2 '>
                <div className='top-0 right-0 flex justify-end w-full lg:absolute lg:mx-2'>
                    <button onClick={onHandleCreateAccount} className='p-2 my-2 text-sm text-white rounded hover:bg-violet-700 md:text-md md:my-4 bg-principal'>Crear una cuenta</button>
                </div>
                
                {url == undefined ?
                <div className='w-[150px] h-[150px]  rounded-full overflow-hidden my-2 lg:my-6'>
                    <img src='https://i.pinimg.com/236x/af/de/72/afde727d75f5aa585c407cd89910cb80.jpg' className='w-[150px] h-[150px] text-center'  alt='profile_photo'/>
                </div>
                :
                <div className='w-[150px] h-[150px]  rounded-full overflow-hidden my-0 lg:my-6'>
                <img src={url} className='w-[150px] h-[150px] text-center'  alt='profile_photo'/>
                </div> 
                }        
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-semibold text-white'>@{profile?.profileInfo.username}</h2>
                    <h3 className='text-xl text-white'>{profile?.profileInfo.displayName}</h3> 
                </div>
                
                <section className='md:w-[700px] w-full mb-28 '>
                    <h2 className='my-6 text-2xl font-semibold text-center text-white'>Mis Links</h2>
                    <div className='flex flex-col justify-center w-full gap-4 '>   
                    {profile?.linksInfo.map((link)=>(
                        <motion.a
                        key={link.title}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.9 }}
                        target='_blank'  href={link.url}>
                            <div 
                            className='relative flex items-center justify-center w-full p-3 text-lg text-center bg-white rounded hover:text-white hover:bg-principal hover:shadow-2xl shadow-black'>
                                <BiLinkExternal className='absolute left-0 ml-2' size={28}/>
                                <p>{link.title}</p>
                            </div>
                        </motion.a>
                    ))        
                    }
                    </div>
                </section>
                <Footer/>
            </main>
            )
        }
    }
    
    

export default PublicPage