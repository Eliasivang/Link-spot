import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, getUserInfo, registerNewUser, userExists } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn,onUserNotRegistered}){
    
    const router = useRouter()
    const [state,setState] = useState(0)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const isRegistered = await userExists(user.uid)
                if(isRegistered){
                    const userInfo = await getUserInfo(user.uid);
                    if(userInfo.processCompleted){
                        onUserLoggedIn(userInfo);
                    }else{
                        onUserNotRegistered(userInfo);
                    }
                    
                }else{
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username: "",
                        processCompleted: false
                    })
                    onUserNotRegistered(user)
                }
        
            }else{
                onUserNotLoggedIn()
            } 
        })
    },[router,onUserLoggedIn,onUserNotLoggedIn,onUserNotRegistered])
    return <div>{children}</div>
}