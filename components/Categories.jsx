"use client"
import React from 'react'
import { getCategories } from '@/services'
import Link from 'next/link';
import { useState,useEffect } from 'react';
const Categories = () => {
  const [categories,setCategories] = useState([]);
  useEffect(()=>{
    getCategories().then((res)=>{
      setCategories(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className='bg-white p-8 rounded-lg shadow-lg'>
      <h3 className='border-b text-xl font-semibold pb-4'>Categories</h3>
        <div className='flex flex-wrap'>
          {
            categories.map((categories,i)=>{
                return (
                   <div className='ml-5' key={i}>
                      <Link key={categories.slug} href={`/category/${categories.slug}`}>
                        <span className='block cursor-pointer pb-3 mb-3 text-gray-700'>
                          {categories.name} <span className='text-amber-800'>|</span>
                        </span>
                      </Link>
                   </div>
                )
            })
          }
        </div>
      </div>
  )
}

export default Categories
