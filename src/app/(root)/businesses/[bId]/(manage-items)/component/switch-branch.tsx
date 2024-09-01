'use client';
import useBranchContext from '@/lib/context/branch-context';
import Combobox, { IOptionCombobox } from '@/modules/common/combobox';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';



const SwitchBranch = ({ branchs }: { branchs: IBranch[]; }) => {
    const branchContext = useBranchContext();
    const router = useRouter();

    const handleSwitcher = (value:string) => {
        branchContext.setId(value);
        router.push(`/businesses/${value}/menu`);
    };
    return (
        <Combobox
            items={branchs.map(e => ({ label: e.name, value: e.id }))} size={300}
            changeValue={handleSwitcher} />
    );
};

export default SwitchBranch;