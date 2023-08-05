'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthProvider from '../components/AuthProvider';
import {v4 as uuidv4} from "uuid";
import { deleteLink, getLinks, insertNewLink, updateLink } from '../firebase/firebase';
import Link from '../components/Link';

function page() {
const router = useRouter();
const [currentUser,setCurrentUser] = useState({});
const [state,setState] = useState(0)
const [title,setTitle] = useState('');
const [url,setUrl] =useState('');
const [links,setLinks] = useState([]);

  async function handleUserLoggedIn (user){
        setCurrentUser(user);
        setState(2);
        const resLinks = await getLinks(user.uid)
        setLinks([...resLinks]);
    }
    function hanldeOnUserNotLoggedIn(){
        router.push("/login");
    }
    function handleUserNotRegistered (user){
        router.push("/login");
    }

    if(state===0){
        return(<AuthProvider 
            onUserLoggedIn={handleUserLoggedIn} 
            onUserNotLoggedIn={hanldeOnUserNotLoggedIn} 
            onUserNotRegistered={handleUserNotRegistered}>
            <div className='flex justify-center w-full my-20'>
            <div className="loader"></div>
            </div>
            </AuthProvider>
            );
    }

    function handleOnSubmit(e){
        e.preventDefault();
        addLink();
    }

    function addLink(){
        if(title !== "" && url !== ""){
            const newLink = {
                id: uuidv4(),
                title: title,
                url:url,
                uid:currentUser.uid
            }
            const res = insertNewLink(newLink);
            newLink.docId = res.id;
            setTitle("");
            setUrl("");
            setLinks([...links,newLink]);
            document.getElementById("myform").reset();
        }
    }
    console.log(links)
    function handleOnChange(e){
        const value = e.target.value;
        if(e.target.name==='title'){
            setTitle(value);
        }
        else if(e.target.name==='url'){
            setUrl(value);
        } 
        console.log(title);
    }
// funcion para elminar link de la DB
    async function handleDeleteLink(docId){
        await deleteLink(docId);
        const tmp = links.filter(link=> link.docId!== docId);
        setLinks([...tmp])  
    }
//funcion para hacer el update del link en la DB
    function handleUpdateLink(docId, title,url ){
        const link = links.find(item=>item.docId ===docId);
        link.title = title;
        link.url = url;
        updateLink(docId,link);
    }
    console.log(links);
    return(
        <div className='flex flex-col items-center justify-center w-full my-8'>
                <h1 className='text-3xl font-bold text-center text-white'>Dashboard</h1>
                <form id='myform' onSubmit={handleOnSubmit} className='flex md:w-[800px] w-full flex-col gap-2 px-2'>
                    <label className="font-semibold text-white" htmlFor="title">Titulo :</label>
                    <input onChange={handleOnChange} className='p-3 text-black bg-white rounded outline-none' placeholder='Link' name='title' type="text"/>
                    <label className="font-semibold text-white" htmlFor="url">Url :</label>
                    <input onChange={handleOnChange} className='p-3 text-black bg-white rounded outline-none ' placeholder='https://link.com/' name='url' type="text"/>
                    <button type='submit' className='w-48 p-2 mt-4 font-semibold text-black bg-white border-white rounded hover:bg-principal hover:text-white '>Crear nuevo link</button>
                </form>
                <div className='px-2 my-8 md:w-[800px] w-full'>
                    <h1 className='px-2 text-3xl font-bold text-center text-white'>Links</h1>
                    {links.length === 0 && <p className='my-6 text-center text-white '>No tienes ningun link</p> }
                    {links.map((link)=>(
                        <Link 
                        key={link.docId} 
                        docId = {link.docId}
                        url={link.url} 
                        title={link.title} 
                        onDelete={handleDeleteLink} 
                        onUpdate={handleUpdateLink}/>
                    ))}
                </div>            
            </div> 
        )
    }

export default page