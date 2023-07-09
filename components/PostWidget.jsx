"use client"
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { getRecentPosts } from '@/services'
import { getRelatedPosts } from '@/services'
const PostWidget = ({categories,slug}) => {
  const [recentPosts,setRecentPosts] = useState([]);
  useEffect(()=>{
    if(slug === undefined)
    {
      //get the recent posts
      getRecentPosts().then((res)=>{
        setRecentPosts(res);
      }).catch((err)=>{
        console.log(err);
      })

    }
    else
    {
      getRelatedPosts(categories,slug).then((res)=>{
        setRecentPosts(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[slug])
  return (
    <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
        <h3 className='border-b mb-3 text-xl font-semibold pb-4'>
          {slug ? "Releted Posts":"Recent Posts"}
        </h3>
        {recentPosts.map((post,i)=>{
          return (
            <div className='w-full flex items-center' key={i}>
              <div className='flex-none'>
                  <img src={post.featuredImage.url} height='150px' width='150px' className='rounded-full align-middle'></img>                
              </div>
              <div className='flex-grow ml-4'>
                  <p className='text-gray-400 font-xs'> {moment(post.createdAt).format("MMM DD, YYYY")} </p>
                  <Link href={`/post/${post.slug}`} key={post.title}> 
                    {post.title}
                  </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default PostWidget
