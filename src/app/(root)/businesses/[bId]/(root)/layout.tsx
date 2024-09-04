import React from 'react';

import axiosClient from '@/lib/utils/axios-client';
import { StoreModal } from '@/lib/schema/storeSchema';
import { redirect } from 'next/navigation';

const layout = async ({
    params,
    children
}: {
    params: {
        bId: string
    }
    children: React.ReactNode;
}) => {
    const { data } = await axiosClient.get<ApiResponse<StoreModal>>("/api/store");
    if (data.payload && data.payload.id != params.bId) {
        redirect(`/businesses/${data.payload.id}/menu`);
    }
    return (
        <>
            {children}
        </>
    );
};

export default layout;