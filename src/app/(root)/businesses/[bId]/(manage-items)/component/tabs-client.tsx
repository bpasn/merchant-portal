'use client';
import { Tabs } from '@/components/ui/tabs';
import useBranchContext from '@/lib/context/branch-context';
import TabComponent from '@/modules/businesses/manage-item-module/component/tab-component';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

const TabsClient = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { id } = useBranchContext();
    const itemTabs = [
        {
            label: "Item menu",
            href: `/businesses/${id}/menu`
        },
        {
            label: "Item option",
            href: `/businesses/${id}/menu-option`
        },
        {
            label: "Item group",
            href: `/businesses/${id}/menu-group`
        },
    ];
    const pathName = usePathname();
    return (
        <Tabs defaultValue={pathName} className="w-full">
            <TabComponent
                items={itemTabs}
            />
            {children}
        </Tabs>
    );
};

export default TabsClient;