'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ManageItem from './item';
import ManageItemOption from './item-option';
import ManageItemGroup from './item-group';

interface TabsItemProps { }
const TabsItem = ({

}: TabsItemProps) => {
    return (
        <Tabs defaultValue={"item"} className="w-full">
            <TabsList className='h-auto p-0 max-w-[568px] flex space-x-2 justify-between  bg-transparent'>
                <TabsTrigger value="item"  >Item</TabsTrigger>
                <TabsTrigger value="itemOption" className={cn("tab-list")}>Item option</TabsTrigger>
                <TabsTrigger value="itemGroup" className={cn("tab-list")}>Item group</TabsTrigger>
            </TabsList>
            <TabsContent value="item" className=''>
                <ManageItem />
            </TabsContent>
            <TabsContent value="itemOption">
                <ManageItemOption />
            </TabsContent>
            <TabsContent value="itemGroup">
                <ManageItemGroup />
            </TabsContent>
        </Tabs>
    );
};

export default TabsItem;