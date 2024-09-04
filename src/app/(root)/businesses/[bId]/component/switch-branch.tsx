import { StoreModal } from '@/lib/schema/storeSchema';
import axiosClient from '@/lib/utils/axios-client';
import Combobox, { IOptionCombobox } from '@/modules/common/combobox';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';



const SwitchBranch = ({
    stores
}:{
    stores: StoreModal[]
}) => {
    
    return (
        <>
            <Combobox
                items={stores.map(e => ({ label: e.storeName, value: e.id }))}
                size={300}
            />
        </>
    );
};

export default SwitchBranch;