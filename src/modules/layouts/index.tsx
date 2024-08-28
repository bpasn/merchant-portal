'use client';
import React, { useState } from 'react';
import Header from './template/Header';
import SideBar from './template/SideBar';
import { SideBarProvider } from '@/lib/context/side-bar-context';
import { BranchProvider } from '@/lib/context/branch-context';
import { ModelStoreProvider } from '@/lib/context/modal-context';
import ModalProvider from '@/lib/providers/modal-provider';


const LayoutModule = ({
    children
}: { children: React.ReactNode; }) => {

    return (
        <BranchProvider>
            <SideBarProvider>
                <ModelStoreProvider>
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
                </ModelStoreProvider>
            </SideBarProvider>
        </BranchProvider>
    );
};

export default LayoutModule;