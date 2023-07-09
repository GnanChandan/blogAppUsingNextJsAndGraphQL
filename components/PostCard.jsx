import React from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
const PostCard = ({post}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 ml-11" style={{width: "85%"}}>
      <img className='object-top w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg pt-5' src={post.featuredImage.url} alt={post.title}/>
      <div className='px-4'>
        <h1 className='transition duration-700 text-center mb-8 mt-5 cursor-pointer hover:text-purple-700 text-3xl font-semibold'>
            <Link href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </h1>
          <p className="text-gray-700 text-base">
            {post.excerpt}
          </p>
      </div>
      <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4 lg-mb-0 w-full lg:w-auto mr-8 pt-4'>
          <img
            alt={post.author.name}  
            src={post.author.photo.url}
            height="30px"
            width="30px"
            className='align-middle rounded-md'
          />
          <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
        </div>
         <div className='font-medium text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span> {moment(post.createdAt).format("MMM DD YYYY")} </span>
        </div>
      </div>
      <div className='text-center'>
        <Link href={`/post/${post.slug}`}>
          <span className='transform duration-500 transition hover:-translate-y-6 font-medium bg-pink-700 text-lg rounded-full text-white px-3 py-4 cursor-pointer'>
            continue reading
          </span>
        </Link>
      </div>
  </div>
  )
}

export default PostCard
