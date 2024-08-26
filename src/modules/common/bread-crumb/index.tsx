'use client';
import { menus } from '@/lib/data/menu';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const findMenuLabel = (
    path: string[], menus: IMenu[], index: number = 0
): string | undefined => {
    for (const menu of menus) {
        const currentPath = `/${path.slice(0, index + 1).join("/")}`;
        if (menu.href === currentPath) {
            // if (menu.paths) {
            //     const subPath = path[index + 1];
            //     const matchedPath = menu.paths.find(p => p.path === subPath);
            //     if (matchedPath) return `${menu.label} > ${matchedPath.label}`;
            // }
            return menu.label;
        } else if (menu.children) {
            const label = findMenuLabel(path, menu.children, index + 1);
            if (label) return `${menu.label} > ${label}`;
        }
    }
    return undefined;
};
const Breadcrumb = () => {
    const router = usePathname();
    if (router === "/") {
        return (
            <div className='flex flex-row'>
                Home
            </div>
        );
    }
    const pathArray = router.split("/").filter(path => path);
    const breadcrumb = pathArray.map((_, index) => {
        const currentPath = `/${pathArray.slice(0, index + 1).join("/")}`;
        const label = findMenuLabel(pathArray, menus, index);
        
        return (
            <div key={index} className='flex flex-row items-center space-x-2'>
                {
                    index === (pathArray.length - 1)? (
                        <span>{label || currentPath.replace(/-/g, " ").split("/").pop()}</span>
                    ) :
                        (
                            <Link href={currentPath}> {label || currentPath.replace(/-/g, " ").split("/").pop()}</Link>
                        )
                }
                {index < pathArray.length - 1 && <ChevronRight size={16} />}
            </div>
        );
    });
    return (
        <div className='flex flex-row space-x-2'>
            {breadcrumb}
        </div>
    );
};

export default Breadcrumb;