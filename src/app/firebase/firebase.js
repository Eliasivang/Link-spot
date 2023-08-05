import { initializeApp } from "firebase/app";
import {getAuth,signOut} from "firebase/auth"
import {getStorage,ref,uploadBytes,getDownloadURL,getByter} from "firebase/storage"
import {getFirestore,collection,addDoc,getDocs,doc,getDoc,query,where,deleteDoc, setDoc} from "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROYECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export async function userExists(uid){
    const docRef = doc(db,"users",uid);
    const res = await getDoc(docRef);
    return res.exists();
}

export async function existsUsername(username){
    const users = [];
    const docsRef= collection(db,"users");
    const q = query(docsRef,where("username","==",username));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc=>{
        users.push(doc.data());
    });
    return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user){
    try {
        const collectionRef = collection(db,"users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef,user);
    } catch (error) {
        
    }
}

export async function updateUser(user){
    try {
        const collectionRef = collection(db,"users");
        const docRef = doc(collectionRef,user.uid);
        await setDoc(docRef,user);

    } catch (error) {
        
    }
}

export async function getUserInfo(uid){
    try {
        const docRef = doc(db,"users",uid);
        const document = await getDoc(docRef);
        return document.data();
    } catch (error) {
        
    }
}

export async function insertNewLink(link){
    try {
        const docRef = collection(db,'links');
        const res = await addDoc(docRef,link);
        return res;
    } catch (error) {
        console.error(error); 
    }
}

export async function getLinks(uid){
    const links = [];
    try {
        const collectionRef = collection(db,'links');
        const q = query(collectionRef, where('uid','==',uid))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc=>{
            const link = {...doc.data()};
            link.docId = doc.id;
            links.push(link)
        });
        return links;
    } catch (error) {
        console.error(error); 
    }
}

export async function updateLink(docId,link){
    try {
        const docRef = doc(db,'links',docId);
        const res = await setDoc(docRef,link);
        return res;
    } catch (error) {
        console.error(error);
        
    }
}

export async function deleteLink(docId){
    try {
        const docRef = doc(db,'links',docId);
        const res = await deleteDoc(docRef);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function setUserProfilePhoto(uid,file){
    try{
    const imageRef = ref(storage,`images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file); 
    return resUpload;
    }catch(error){
        console.error(error); 
    
    }
}

export async function getProfilePhotoUrl(profilePicture){
    try {
        const imageRef = ref(storage,profilePicture);
        const url = await getDownloadURL(imageRef)
        return url;
    } catch (error) {
        console.error(error);
        
    }
}

export async function getUserPublicProfileUser(uid){
        const profileInfo = await getUserInfo(uid);
        const linksInfo = await getLinks(uid);
        return{
            profileInfo:profileInfo,
            linksInfo:linksInfo
        };
}

export async function exit(){
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
    }
    
}