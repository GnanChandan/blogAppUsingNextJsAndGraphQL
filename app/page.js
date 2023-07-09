import '../styles/globals.scss';
import PostCard from '@/components/PostCard';
import PostWidget from '@/components/PostWidget';
import Categories from '@/components/Categories';
import {getPosts} from '../services'
import FeaturedPostCards from '@/sections/FeaturedPostCards';
export default async function Home() {

  let posts = await getPostData()
  return (
    <div className='container mx-auto px-10 mb-8'>
    <FeaturedPostCards/>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
            {
                posts.map((post,i)=>{return  <PostCard post={post.node} key={i} title={post.title}/>})
            }
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-8'>
               <PostWidget/>
               <Categories/>
            </div>
          </div>
      </div>
    </div>
  )
  
}

async function getPostData(){
  const posts = (await getPosts())||[];
  return posts;
}
