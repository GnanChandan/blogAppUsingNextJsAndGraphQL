"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import moment from 'moment'
import { getComments } from '@/services'
import parse from 'html-react-parser'
const Comments = ({slug}) => {
  const [comments,setComments] = useState([]);
  useEffect(()=>{
    getComments(slug).then((res)=>{
      setComments(res);
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  
  return (
    <div className='bg-white p-8 shadow-lg rounded-lg mt-5'>
      {
          <>
            {comments.length?<h3 className='border-b text-xl font-semibold p-3'>{comments.length}{' '} comments</h3>:<h3 className='border-b text-xl font-semibold p-3'>No Comments</h3>}
  
            {
              comments.map((comment,i)=>{
                return (
                  <div key={i} className='border-b border-gray-100 mb-4 pb-4'>
                    <p className='mb-4'> 
                      <span>
                        {comment.name} on {' '} {moment(comment.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </p>
                    <p className='whitespace-pre-line text-gray-600 w-full'>{parse(comment.comment)}</p>
                  </div>
                )
              })
            }
        </>

      }
    </div>
  )
}

export default Comments
