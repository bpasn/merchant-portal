'use client';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React from 'react';
import TabComponent from './tab-component';


const TabContentComponent = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const itemTabs = [
        {
            value: "menu",
            label: "Item menu",
            href: "/menu"
        },
        {
            value: "menu-option",
            label: "Item option",
            href: "/menu-option"
        },
        {
            value: "menu-group",
            label: "Item group",
            href: "/menu-group"
        },
    ];
    return (
        <Tabs>
            <TabComponent items={itemTabs} />
            <TabsContent value={''}>{children}</TabsContent>
        </Tabs>
    );
};

export default TabContentComponent;