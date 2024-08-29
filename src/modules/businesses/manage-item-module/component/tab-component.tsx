'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EachElement } from '@/lib/utils';
import { useParams } from 'next/navigation';
import React from 'react';
interface TabComponentProps {
  label: string;
  href: string;
}
const TabComponent = ({ items = [] }: {
  items: TabComponentProps[];
}) => {
  return (
    <TabsList className='h-auto p-0 max-w-[568px] flex space-x-2 justify-between  bg-transparent'>
      <EachElement
        of={items}
        render={(item) => {
          return (
            <TabsTrigger value={item.href} href={item.href}>
              {item.label}
            </TabsTrigger>
          );
        }}
      />
    </TabsList>
  );
};

export default TabComponent;