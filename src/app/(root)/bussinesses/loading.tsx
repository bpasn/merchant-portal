import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type Props = {};

const LoadingRoot = (props: Props) => {
    return (
        <div className='flex flex-col'>
            <div className='pt-[48px] pb-[24px] flex flex-row'>
                <h1 className='text-xl'><Skeleton className='w-[200px] h-10' /></h1>
            </div>
            <div className='mb-5 '>
                <Skeleton className='w-[300px] h-10' />
            </div>
            <div className="w-full">
                <div className='h-auto p-0 max-w-[568px] flex space-x-2 justify-between  bg-transparent'>
                    <Skeleton className='h-[50px] w-full rounded-bl-none rounded-br-none' />
                    <Skeleton className='h-[50px] w-full rounded-bl-none rounded-br-none' />
                    <Skeleton className='h-[50px] w-full rounded-bl-none rounded-br-none' />
                </div>
                <div className='mt-5'>
                    <Skeleton className='h-[225px] w-full rounded-xl rounded-tl-none rounded-tr-none' />
                </div>
            </div>
            <div className="mb-10"></div>
        </div>
    );
};

export default LoadingRoot;