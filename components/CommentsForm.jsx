"use client"
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { postComment } from '@/services'

const CommentsForm = ({slug}) => {
  const commentRef = useRef();
  const NameRef = useRef();
  const emailRef = useRef();
  const storeDataRef = useRef();
  const [storeData,setStoreDate] = useState(false);
  const [error,setError] = useState(false);
  const [showSuccessMessage,setShowSuccessMessage] = useState(false);

  useEffect(()=>{
    NameRef.current.value = window.localStorage.getItem('name');
    emailRef.current.value = window.localStorage.getItem('email');
  },[])

  const handleSubmit = ()=>{
    const {value: comment} = commentRef.current;
    const {value: name}  = NameRef.current;
    const {value:email} = emailRef.current;
    const {checked: storeDataLocally} =  storeDataRef.current;

    if (!comment || !name || !email)
    {
      setError(true);
    }
    else
    {
       if(error === true)
       {
          setError(false);
       }
       if (storeDataLocally)
       {
          window.localStorage.setItem('email',email);
          window.localStorage.setItem('name',name);
       }
       else
       {
          window.localStorage.removeItem('email',email);
          window.localStorage.removeItem('name',name);
       }
       postComment({name,email,comment,slug}).then((res)=>{
          setShowSuccessMessage(true);

          setTimeout(()=>{
            setShowSuccessMessage(false);
          },3000);
       }).catch((error)=>{
        console.log(error);
       });
    }

  }
  return (
    <div className='bg-white rounded-lg shadow-lg p-8 mt-8'>
      <h1 className='text-3xl font-semibold p-3 border-b'>Comments Form</h1>
      <div className='grid grid-cols-1 w-full mt-5'>
        <textarea name="commentBox" ref={commentRef} placeholder='Comment' className='outline-none w-full focus:ring-2 bg-gray-100 p-4'/>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 w-full mt-5'>
        <input
          ref={NameRef}
          name="Name"
          type='text'
          placeholder='Name'
          className='bg-gray-100 focus:ring-2 outline-none p-3 lg:mr-4 mb-2 lg:mb-0'
        />
        <input
          ref={emailRef}
          name="email"
          placeholder='Email'
          type='email'
          className='bg-gray-100 focus:ring-2 outline-none p-3'
          
        />
      </div>
      {error && <h3 className='text-red-400 text-xl mt-3'> please fill all the the fields </h3>}
      <div className='mt-5'>
        <input ref={storeDataRef} type='checkbox' name='storeData' id='storeData' className='mr-2'/>
        <label htmlFor='storeData'>save my e-mail and name for the next time I comment</label>
      </div>
      <button type='button' className='bg-pink-700 rounded-full text-white px-5 py-4 mt-4 transition hover:bg-cyan-800' onClick={handleSubmit}>Post Comment</button>
      {showSuccessMessage && <h3 className='text-green-400 text-xl mt-4'>Comment posted successfully</h3>} 
    </div>
  )
}

export default CommentsForm
