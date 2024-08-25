'use client';
import React, { useState } from 'react';
import Header from './template/Header';
import SideBar from './template/SideBar';
import { SideBarProvider, useSidebarContext } from '@/lib/context/side-bar-context';


const LayoutModule = ({
    children
}: { children: React.ReactNode; }) => {
   
    return (
        <SideBarProvider>
            <div className=''>
                <SideBar />
                <div className='mdl:ml-[240px]'>
                    <Header />
                    <main className="bg-gray-50 p-0 m-auto mt-[64px] px-5">
                        {children}
                    </main>
                </div>
            </div>
        </SideBarProvider>
    );
};

export default LayoutModule;