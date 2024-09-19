'use client';
import React from 'react';
import Header from './template/Header';
import SideBar from './template/SideBar';
import ModalProvider from '@/lib/providers/modal-provider';


const LayoutModule = ({
    children
}: { children: React.ReactNode; }) => {

    return (
        <div className=''>
            <SideBar />
            <div className='mdl:ml-[240px]'>
                <Header />
                <main className="p-0 m-auto mt-[64px] px-5">
                    {children}
                    <ModalProvider />
                </main>
            </div>
        </div>
    );
};

export default LayoutModule;