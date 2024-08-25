'use client';
import { useParams } from 'next/navigation';
import React from 'react'

type Props = {}

const Header = () => {
    const queryParam = useParams();
  return (
    <header className='h-[64px] md:w-[calc(100%_-_240px)] flex items-center bg-[rgb(255,255,255)] shadow-[rgba(0,_0,_0,_0.08)_0px_1px_4px] fixed top-0 left-auto right-0 z-[1100]'>
        <h1 className='mr-4'>Manage Store</h1>
        <div className="ml-auto px-5">
            profile
        </div>
    </header>
  )
}

export default Header