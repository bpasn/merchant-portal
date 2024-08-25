'use client';
import { menus } from '@/lib/data/menu';
import { EachElement } from '@/lib/utils';
import React from 'react';
import MenuItem from './component/MenuItem';
const SideBar = ({
    isOpen
}:{
    isOpen:boolean;
}) => {
    return (
        <aside id="default-sidebar" className="flex-col border-none shadown-[0px_calc(56px_+_8px)_4px_rgba(0,0,0,0.08)] hidden md:block fixed top-0 left-0 z-40 w-[240px] h-screen ease-in-out duration-300 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full overflow-y-auto  ">
                <div className='flex items-center min-h-[64px] bg-[rgb(255,255,255)] justify-center transition-[background-color_150ms_cubic-bezier(0.4,0,0.2,1)_0m]'>
                    <h1>Merchant Portal Loto</h1>
                </div>
                <hr />
                <ul>
                    <EachElement
                        of={menus}
                        render={(menu,index) => <MenuItem key={index} menu={menu}/>}
                    />
                </ul>

            </div>
        </aside>
    );
};

export default SideBar;;