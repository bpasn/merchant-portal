import { getStore } from '@/lib/services/store.service';
import React from 'react';


const layout = async ({
    children
}: {
    params: {
        bId: string;
    };
    children: React.ReactNode;
}) => {
    await getStore();
    return (
        <>
            {children}
        </>
    );
};

export default layout;