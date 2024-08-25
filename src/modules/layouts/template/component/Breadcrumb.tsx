'use client';
import { menus } from '@/lib/data/menu';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};
const findMenuLabel = (
    path: string[], menus: IMenu[], index: number = 0
): string | undefined => {

    for (const menu of menus) {
        console.log(`/${path.slice(0, index + 1).join("/")}`);
        if (menu.href === `/${path.slice(0, index + 1).join("/")}`) {
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
    const pathArray = router.split("/").filter(path => path);
    const breadcrumb = pathArray.map((_, index) => {
        const currentPath = `/${pathArray.slice(0, index + 1).join("/")}`;
        const label = findMenuLabel(pathArray, menus, index);
        return (
            <Link key={index} href={currentPath}>
                {label}
                {index < pathArray.length - 1 && <ChevronRight />}
            </Link>
        );
    });
    return (
        <div>
            {router === "/" ? (
                <span>
                    Home
                </span>
            ) : breadcrumb}
        </div>
    );
};

export default Breadcrumb;