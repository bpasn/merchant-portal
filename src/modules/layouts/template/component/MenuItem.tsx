import { useSidebarContext } from '@/lib/context/side-bar-context';
import IconLucide from '@/lib/hooks/icon-lucide';
import { EachElement } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
interface MenuItemProps {
    menu:IMenu;
    level?:number;
}
const MenuItem = ({
    menu,
    level = 0
}:MenuItemProps) => {
    const [expanded, setExpanded] = useState(menu.expanded || false);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const hasChildren = menu.children && menu.children.length;
    const sideBarContext = useSidebarContext();
    return (
        <li className={`menu ${expanded ? 'expanded' : ''}`}>
            {!hasChildren ? (
                <Link href={menu.href} onClick={() => sideBarContext.setOpen(false)} className='flex flex-row items-center py-3 px-3 space-x-4 hover:bg-gray-100 cursor-pointer'>
                    {menu.icon ? <IconLucide name={menu.icon} /> : null}
                    <span className='text-[14px] '>{menu.label}</span>
                </Link>
            ) : (
                <div className='flex flex-col'>
                    <button onClick={handleToggle} className='flex flex-row gap-5 px-4 py-4 hover:bg-gray-100 cursor-pointer w-full'>
                        {menu.icon ? <IconLucide name={menu.icon} /> : null}
                        <span className='text-[14px]'>{menu.label}</span>
                        <ChevronDown size={16} className={`text-gray ml-auto transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    <ul className={`sub-menu overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`} style={{ paddingLeft: `${level * 20}px` }}>
                        {hasChildren && (
                            <EachElement
                                of={menu.children!}
                                render={(element, index) => <MenuItem key={index} menu={element} level={level + 1} />}
                            />
                        )}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default MenuItem;
