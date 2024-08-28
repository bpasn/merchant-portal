'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useBranchContext from "@/lib/context/branch-context";
import Combobox from "@/modules/common/combobox";
import HeadingModule from "@/modules/common/heading-module";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

type Props = {};

const ManageItemLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname();
  const router = useRouter();
  const { id } = useBranchContext();
  return (
    <div className='flex flex-col'>
      <HeadingModule
        title="Manage items"
      />

      <div className='mb-5'>
        <Combobox size={300} />
      </div>
      <Tabs defaultValue={path} className="w-full">
        <TabsList className='h-auto p-0 max-w-[568px] flex space-x-2 justify-between  bg-transparent'>
          <TabsTrigger value={`/bussinesses/${id}/menu`} onClick={(e) => {
            e.preventDefault();
            router.push(`/bussinesses/${id}/menu`);
          }}>
            Item
          </TabsTrigger>
          <TabsTrigger value={`/bussinesses/${id}/menu-option`} onClick={(e) => {
            e.preventDefault();
            router.push(`/bussinesses/${id}/menu-option`);
          }}>
            Item option
          </TabsTrigger>
          <TabsTrigger value={`/bussinesses/${id}/menu-group`} onClick={(e) => {
            e.preventDefault();
            router.push(`/bussinesses/${id}/menu-group`);
          }} >
            Item group
          </TabsTrigger>
        </TabsList>
        <Suspense fallback={<>Loading...</>}>
          {children}
        </Suspense>
      </Tabs>
      <div className="mb-10"></div>
    </div>
  );
};

export default ManageItemLayout;