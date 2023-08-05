'use client'
import { useParams } from 'next/navigation';
import {BiLinkExternal} from 'react-icons/bi'
import { motion } from "framer-motion"
import  { useEffect, useState } from 'react'
import { existsUsername,getProfilePhotoUrl,getUserPublicProfileUser} from '@/app/firebase/firebase';

function PublicPage() {
    const params = useParams();
    const [profile,setProfile] = useState(null);
    const [url,setUrl] = useState('');
    const [state,setState] = useState(0)
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
                    setState(6)
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
            <main className='flex flex-col items-center justify-center w-full px-2 mb-10'>
                <div className='w-[150px] h-[150px] my-4 rounded-full overflow-hidden'>
                    <img src={url} className='w-[150px] h-[150px]'  alt='profile_photo'/>
                </div>                
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-semibold text-white'>@{profile?.profileInfo.username}</h2>
                    <h3 className='text-xl text-white'>{profile?.profileInfo.displayName}</h3> 
                </div>
                
                <section className='md:w-[700px] w-full '>
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
            </main>
            )
        }
    }
    
    

export default PublicPage