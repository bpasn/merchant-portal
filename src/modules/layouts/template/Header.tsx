'use client';
import { Menu } from 'lucide-react';
import React from 'react';
import Breadcrumb from '@/modules/common/bread-crumb';
import { useSidebarStore } from '@/lib/hooks/stores/store-sidebar';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStoreModal } from '@/lib/hooks/stores/store-modal';


const Header = () => {
  const { data: session } = useSession();
  const sidebarContext = useSidebarStore();
  const storeModal = useStoreModal();
  return (
    <header className='h-[64px] w-full px-5 mdl:w-[calc(100%_-_240px)] flex items-center bg-[rgb(255,255,255)] shadow-[rgba(0,_0,_0,_0.08)_0px_1px_4px] fixed top-0 left-auto right-0'>
      <div className="flex flex-row items-center space-x-3 cursor-pointer" >
        <Menu className='block mdl:hidden' onClick={() => sidebarContext.setOpen(!sidebarContext.open)} />
        <Breadcrumb />
      </div>
      <div className="ml-auto px-5">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{session.user?.email?.split("@").at(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={() => {
                storeModal.openModal((
                  <div className='flex flex-col gap-4 p-2'>
                    <p>You need to sigh out?</p>
                    <Button className='ml-auto' onClick={() => {
                      storeModal.closeModal();
                      signOut();
                    }}>Ok</Button>
                  </div>
                ), "Are you sure!");
              }}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
};

export default Header;