import '../styles/globals.scss'
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
const NextCard = ({post,button}) => {
  return (
    <div className="relative h-72 mt-8 mb-8">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    {
        button === "next" && (
          <div className="absolute top-1/2 transform -translate-y-1/2 arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-white lg:w-6 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        )
    }
    {
      button === "prev" && (
        <div className="absolute arrow-btn left-0 top-1/2 transform -translate-y-1/2  text-center py-3 cursor-pointer bg-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-white lg:w-6 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </div>
      )
    }
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{post.title}</p>
      <div className="flex items-center absolute bottom-5 w-full justify-center">
        <Image
          unoptimized
          alt={post.author.name}
          height={30}
          width={30}
          className="align-middle drop-shadow-lg rounded-full"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-white text-shadow ml-2 font-medium">{post.author.name}</p>
      </div>
    </div>
    <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
  )
}

export default NextCard
