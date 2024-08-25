'use client';
import React from 'react';

const HeadingModule = ({
    title,
}: {
    title: string;
    children?: React.ReactNode
}) => {
    return (
        <div className='pt-[48px] pb-[24px]'>
            <h1 className='text-xl'>{title}</h1>
        </div>
    );
};

export default HeadingModule;