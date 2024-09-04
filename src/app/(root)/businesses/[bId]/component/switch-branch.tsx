import { StoreModal } from '@/lib/schema/storeSchema';
import axiosClient from '@/lib/utils/axios-client';
import Combobox, { IOptionCombobox } from '@/modules/common/combobox';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';



const SwitchBranch = async () => {
    const { data } = await axiosClient.get<ApiResponse<StoreModal[]>>(`/api/store/get-all`);
    if (!data.payload.length) {
        redirect('/businesses/menu');
    }
    return (
        <>
            <Combobox
                items={data.payload.map(e => ({ label: e.storeName, value: e.id }))}
                size={300}
            />
        </>
    );
};

export default SwitchBranch;