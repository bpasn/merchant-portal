'use client';
import { Menu } from 'lucide-react';
import React from 'react';
import Breadcrumb from '@/modules/common/bread-crumb';
import { useSidebarStore } from '@/lib/hooks/store-sidebar';


const Header = () => {
  const sidebarContext = useSidebarStore();
  return (
    <header className='h-[64px] w-full px-5 mdl:w-[calc(100%_-_240px)] flex items-center bg-[rgb(255,255,255)] shadow-[rgba(0,_0,_0,_0.08)_0px_1px_4px] fixed top-0 left-auto right-0'>
      <div className="flex flex-row items-center space-x-3 cursor-pointer" >
        <Menu className='block mdl:hidden' onClick={() => sidebarContext.setOpen(!sidebarContext.open)}/>
        <Breadcrumb />
      </div>
      <div className="ml-auto px-5">
        profile
      </div>
    </header>
  );
};

export default Header;