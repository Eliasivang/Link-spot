import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { existsUsername, getProfilePhotoUrl } from '../firebase/firebase';

function PublicProfile() {
    const params = useParams();
    const [profile,setProfile] = useState(null);
    const [url,setUrl] = useState(' ');
    
    useEffect(()=>{
    getProfile();
        async function getProfile(){
            const username = params.username;

        
            try {
            const userUid= await existsUsername(username);
                if(userUid){
                    const userInfo = await getPublicProfileInfo(userUid);
                    setProfile(userInfo);
                    const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
                    setUrl(url);
                }
            }catch (error) {
                console.error(error);
            }
        }
    })

    return (
    <div>
        <div>
            <Image src ={url} />
        </div>
        <h2>{profile.profileInfo.username}</h2>
        <h3>{profile.profileInfo.displayName}</h3>
        <section>
            <h2>Links</h2>
            <ul>

            
            {profile?.linksInfo.map((link)=>{
                <li className='text-black bg-white rounded-xl'><a href={link.url}>{link.title}</a></li>
            })  
            }
            </ul>
        </section>
    </div>
  )
}

export default PublicProfile