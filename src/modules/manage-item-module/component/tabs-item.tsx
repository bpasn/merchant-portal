'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react';
import ManageItemTemplate from '../template/manage-item-template';
import { cn } from '@/lib/utils';
import ManageItemOptionTemplate from '../template/manage-item-option-template';
import ManageItemGroupTemplate from '../template/manage-item-group-template';

interface TabsItemProps { }
const TabsItem = ({

}: TabsItemProps) => {
    const [value, setValue] = useState("item");
    return (
        <Tabs defaultValue="item" className="w-full">
            <TabsList className='h-auto p-0 max-w-[568px] flex space-x-2 justify-between  bg-transparent'>
                <TabsTrigger value="item"  >Item</TabsTrigger>
                <TabsTrigger value="itemOptoin" className={cn("tab-list")}>Item option</TabsTrigger>
                <TabsTrigger value="itemGroup" className={cn("tab-list")}>Item group</TabsTrigger>
            </TabsList>
            <TabsContent value="item" className=''>
                <ManageItemTemplate />
            </TabsContent>
            <TabsContent value="itemOption">
                <ManageItemOptionTemplate />
            </TabsContent>
            <TabsContent value="itemGorup">
                <ManageItemGroupTemplate />
            </TabsContent>
        </Tabs>
    );
};

export default TabsItem;