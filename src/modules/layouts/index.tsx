'use client';
import React, { useState } from 'react';
import Header from './template/Header';
import SideBar from './template/SideBar';


const LayoutModule = ({
    children
}: { children: React.ReactNode; }) => {
    const [open,isOpen] = useState(false)
    return (
        <div className=''>
            <SideBar isOpen={open}/>
            <div className='mdl:ml-[240px]'>
                <Header />
                <main className="bg-gray-50 p-0 m-auto mt-[64px] px-5">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default LayoutModule;