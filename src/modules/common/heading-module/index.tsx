'use client';
import React from 'react';

const HeadingModule = ({
    title,
    children
}: {
    title: string;
    children?: React.ReactNode
}) => {
    return (
        <div className='pt-[48px] pb-[24px] flex flex-row'>
            <h1 className='text-xl'>{title}</h1>
            <div className="ml-auto">{children}</div>
        </div>
    );
};

export default HeadingModule;