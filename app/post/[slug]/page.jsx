import '../../../styles/globals.scss'
import React from 'react'
import Categories from '@/components/Categories'
import PostWidget from '@/components/PostWidget'
import PostDetail from '@/components/PostDetail'
import Author from '@/components/Author'
import Comments from '@/components/Comments'
import CommentsForm from '@/components/CommentsForm'
import { getPostDetails,getPostsOfSameCategory } from '@/services'
import NextCard from '@/components/NextCard'
const PostDetails = async ({params}) => {
  const postDetail = await getPostData(params.slug);
  const PostCategories = postDetail.categories.map((category)=>{return category.name});
  const relatedPosts = await getPostsOfSameCategory(PostCategories,params.slug);

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={postDetail}/>
                <Author author={postDetail.author}/>
                {relatedPosts.next && <NextCard post={relatedPosts.next} button="next"/>}
                {relatedPosts.prev && <NextCard post={relatedPosts.prev} button="prev"/>}
                <CommentsForm slug={postDetail.slug}/>
                <Comments slug={postDetail.slug}/>
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <PostWidget slug={postDetail.slug} categories={PostCategories}/>
                    <Categories/>
                </div>
            </div>
        </div>
    </div>
  )
}

async function getPostData(slug){
    const posts = (await getPostDetails(slug))||[];
    return posts;
  }


export default PostDetails


