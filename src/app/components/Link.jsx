'use client'
import React, { useRef, useState,useEffect } from 'react'
import { deleteLink } from '../firebase/firebase';
import {AiFillDelete} from 'react-icons/ai'
import {AiFillEdit} from 'react-icons/ai'

function Link({docId,title,url,onDelete,onUpdate}) {
const [currentTitle,setCurrentTitle] = useState(title); // estado para mopdificar el titulo
const [currentUrl,setCurrentUrl] = useState(url); //estado para modificar la url
const [editTitle,setEditTitle] = useState(false);
const [editUrl,setEditUrl] = useState(false);
const titleRef = useRef(null);
const urlRef = useRef(null);

useEffect(() => {
    if(titleRef.current){
        titleRef.current.focus() //si existe algo en la referencia hacemos un focus en input
    }
}, [editTitle])
useEffect(() => {
    if(urlRef.current){
        urlRef.current.focus() //si existe algo en la referencia hacemos un focus en input
    }
}, [editUrl])


function handleOnEditTitle(){
    setEditTitle(true)
}
function handleOnEditUrl(){
    setEditUrl(true)  
}
function handleOnChangeTitle(e){
    setCurrentTitle(e.target.value);
}
function handleOnChangeUrl(e){
    setCurrentUrl(e.target.value);
}
// funciones para modificar los inputs 
function handleOnBlurTitle(){
    setEditTitle(false);
    onUpdate(docId,currentTitle,currentUrl);
}
function handleOnBlurUrl(){
    setEditUrl(false);
    onUpdate(docId,currentTitle,currentUrl);
}
async function handleRemoveLink(){
    await deleteLink();
    onDelete(docId)
}


  return (
    <div className='flex justify-between gap-2 p-2 my-8 bg-white rounded' key={docId}>
            <div className='flex flex-col w-full gap-2 overflow-hidden'>
                {editTitle ?
                    <input 
                    ref={titleRef} 
                    className='w-full p-2 text-black border-2 rounded font-semi bold' 
                    onChange={handleOnChangeTitle} value={currentTitle} 
                    onBlur={handleOnBlurTitle} /> // cuando saquemos el foco del input de ejecuta la funcion
                    :
                    <div className='flex items-center gap-2'>
                   <button onClick={handleOnEditTitle} className='p-2 font-semibold rounded hover:text-blue-500 text-neutral-400'><AiFillEdit/></button>
                    <p className='font-semibold'>{currentTitle}</p>
                </div>
                }
                {editUrl ?
                    <input 
                    ref={urlRef} 
                    className='p-2 text-black border-2 rounded font-semi bold' 
                    onChange={handleOnChangeUrl} 
                    value={currentUrl}  
                    onBlur={handleOnBlurUrl} /> 
                :
                <div className='flex items-center h-full gap-2'>  
                    <button onClick={handleOnEditUrl} className='p-2 font-semibold rounded hover:text-blue-500 text-neutral-400'><AiFillEdit/></button>
                    <p className=''>{currentUrl}</p>
                </div>
                }
        </div>

        <div className='flex items-center'>
            <button onClick={handleRemoveLink} className='w-full p-2 text-neutral-400 hover:text-red-500'><AiFillDelete size={25} /></button>
        </div>
    </div>
  )
}

export default Link