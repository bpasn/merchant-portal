'use client';
import { menus } from '@/lib/data/menu';
import { cn, EachElement } from '@/lib/utils';
import React from 'react';
import MenuItem from './component/MenuItem';
import { useSidebarContext } from '@/lib/context/side-bar-context';
const SideBar = () => {
    const sidebarContext = useSidebarContext();

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                sidebarContext.setOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <>
            <div className={
                cn(
                    "fixed inset-0 bg-black transition-opacity",
                    sidebarContext.open ? "opacity-50 z-30" : "opacity-0 pointer-events-none"
                )
            } onClick={() => sidebarContext.setOpen(!open)} />
            <aside id="default-sidebar"
                className={cn(
                    sidebarContext.open ? "translate-x-0" : "-translate-x-full",
                    "mdl:translate-x-0",
                    "fixed top-0 left-0 z-40 w-[240px] h-screen bg-white shadow-lg",
                    "ease-in-out duration-300 transition-transform"
                )}
                aria-label="Sidebar">
                <div className="h-full overflow-y-auto">
                    <div className='flex items-center min-h-[64px] bg-[rgb(255,255,255)] justify-center'>
                        <h1>Merchant Portal Logo</h1>
                    </div>
                    <hr />
                    <ul>
                        <EachElement
                            of={menus}
                            render={(menu, index) => <MenuItem key={index} menu={menu} />}
                        />
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;;