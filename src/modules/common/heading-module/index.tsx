'use client';
import { useStoreHead } from '@/lib/hooks/stores/store-head';
import React from 'react';

const HeadingModule = ({
    children
}: {
    children?: React.ReactNode;
}) => {
    const { title } = useStoreHead();
    return (
        <div className='pt-[48px] pb-[24px] flex flex-row'>
            <h1 className='text-xl'>{title}</h1>
            <div className="ml-auto">{children}</div>
        </div>
    );
};

export default HeadingModule;