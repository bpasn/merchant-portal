'use client';
import { StoreModal } from '@/lib/schema/storeSchema';
import axiosClient from '@/lib/utils/axios-client';
import Combobox, { IOptionCombobox } from '@/modules/common/combobox';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';



const SwitchBranch = () => {
    // const router = useRouter();
    // const [store, setStore] = useState<StoreModal[]>([]);
    // const fetchStore = async () => {
    //     const { data } = await axiosClient.get<ApiResponse<StoreModal[]>>("/api/store/get-all");
    //     if (!data.payload.length) {
    //         return router.push(`/businesses`);
    //     }

    //     setStore(data.payload);
    // };
    // useEffect(() => {
    //     fetchStore();
    // }, []);
    // const mapper: IOptionCombobox[] = store.map(e => ({ label: e.storeName, value: e.id.toString() }));
    return (
        <>
            <Combobox
                items={[]}
                size={300}
            />
        </>
    );
};

export default SwitchBranch;