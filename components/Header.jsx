import Link from 'next/link'
import React,{useContext} from 'react'
import { getCategories } from '@/services'

const Header = () => {
  const Categories = await getCategories();
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-450 py-8'>
            <div className='md:float-left block'>
                <Link href="/"> 
                    <span className='cursor-pointer font-bold text-4xl text-white'>
                        Blog App
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                {Categories.map((c)=>{
                    return (
                        <Link key={c.slug} href={`/category/${c.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-5 font-semibold cursor-pointer'>
                                {c.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Header
