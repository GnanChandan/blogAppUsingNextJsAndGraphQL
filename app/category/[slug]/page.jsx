import '../../../styles/globals.scss'
import React from 'react'
import { getPostsWithCategory } from '@/services';
import Categories from '@/components/Categories';
import PostCard from '@/components/PostCard';
const CategoriesCards = async ({params}) => {
  const posts = await getPostsWithCategory(params.slug);
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
            {
                posts.map((post,i)=>{return  <PostCard post={post} key={i} title={post.title}/>})
            }
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-8'>
               <Categories/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CategoriesCards
