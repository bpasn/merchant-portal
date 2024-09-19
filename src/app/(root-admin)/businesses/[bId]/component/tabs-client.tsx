'use client';
import { Tabs } from '@/components/ui/tabs';
import TabComponent from '@/modules/businesses/manage-item-module/component/tab-component';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';


const TabsClient = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const param = useParams();
    const itemTabs = [
        {
            label: "Item menu",
            href: `/businesses/${param.bId}/menu`
        },
        {
            label: "Item option",
            href: `/businesses/${param.bId}/menu-option`
        },
        {
            label: "Item group",
            href: `/businesses/${param.bId}/menu-group`
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