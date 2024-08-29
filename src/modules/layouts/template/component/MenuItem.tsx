import { useSidebarContext } from '@/lib/context/side-bar-context';
import IconLucide from '@/lib/hooks/icon-lucide';
import { EachElement } from '@/lib/utils';
import { IRoute } from '@/types/router-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
interface MenuItemProps {
    route: IRoute;
    level?: number;
}
const MenuItem = ({
    route,
    level = 0
}: MenuItemProps) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const hasChildren = route.children && route.children.length;
    const sideBarContext = useSidebarContext();
    return (
        <li className={`menu ${expanded ? 'expanded' : ''}`}>
            {!hasChildren ? (
                <Link href={route.href!} onClick={() => sideBarContext.setOpen(false)} className='flex flex-row items-center py-3 px-3 space-x-4 hover:bg-gray-100 cursor-pointer'>
                    {route.icon ? <IconLucide name={route.icon} /> : null}
                    <span className='text-[14px] '>{route.label}</span>
                </Link>
            ) : (
                <div className='flex flex-col'>
                    <button onClick={handleToggle} className='flex flex-row gap-5 px-4 py-4 hover:bg-gray-100 cursor-pointer w-full'>
                        {route.icon ? <IconLucide name={route.icon} /> : null}
                        <span className='text-[14px]'>{route.label}</span>
                        <ChevronDown size={16} className={`text-gray ml-auto transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    <ul className={`sub-menu overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`} style={{ paddingLeft: `${level * 20}px` }}>
                        {hasChildren && (
                            <EachElement
                                of={route.children!}
                                render={(element, index) => <MenuItem key={index} route={element} level={level + 1} />}
                            />
                        )}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default MenuItem;
