import React from 'react';

import axiosClient from '@/lib/utils/axios-client';
import { StoreModal } from '@/lib/schema/storeSchema';
import { redirect } from 'next/navigation';
import { actionBus } from './action';

const layout = async ({
    params,
    children
}: {
    params: {
        bId: string;
    };
    children: React.ReactNode;
}) => {
    await actionBus();
    return (
        <>
            {children}
        </>
    );
};

export default layout;