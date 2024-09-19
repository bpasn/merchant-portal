'use client';
import { routes } from '@/lib/data/menu';
import { cn, EachElement } from '@/lib/utils';
import React from 'react';
import MenuItem from './component/MenuItem';
import { useSidebarStore } from '@/lib/hooks/stores/store-sidebar';
const SideBar = () => {
    const sideBar = useSidebarStore();

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                sideBar.setOpen(false);
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
                    sideBar.open ? "opacity-50 z-30" : "opacity-0 pointer-events-none"
                )
            } onClick={() => sideBar.setOpen(!open)} />
            <aside id="default-sidebar"
                className={cn(
                    sideBar.open ? "translate-x-0" : "-translate-x-full",
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
                            of={routes}
                            render={(route, index) => <MenuItem key={index} route={route} />}
                        />
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;;