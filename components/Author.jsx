import Image from 'next/image'
import React from 'react'

const Author = ({author}) => {
  return (
    <div className= 'relative bg-black shadow-lg rounded-lg p-12 mb-8 mt-20 bg-opacity-20 text-center'>   
        <div className='absolute left-0 right-0 -top-14'>
            <Image 
            src={author.photo.url}
            alt={author.name}
            unoptimized
            className='mx-auto rounded-full'
            height={100}
            width={100}
          />
        </div>
        <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
        <p className='text-white text-lg'>{author.bio}</p>
    </div>
  )
}

export default Author
