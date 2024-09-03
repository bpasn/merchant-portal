'use client';
import { routes } from '@/lib/data/menu';
import { useBranchStore } from '@/lib/hooks/store-branch';
import { IRoute } from '@/types/router-menu';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function generateBreadcrumbs(currentPath: string,id?: string): IRoute[] {
    const breadcrumbs: IRoute[] = [];
    const addBreadcrumbs = (routes: IRoute[], parentPath = "") => {
        routes.forEach(route => {
            let fullPath = `${parentPath}${route.href}`;
            // จับคู่เส้นทางที่มี [id]
            if (fullPath.includes("[id]") && id) {
                fullPath = fullPath.replace("[id]", id);
            }
            // ตรวจสอบว่าปัจจุบันอยู่ในเส้นทางนี้หรือไม่
            if (currentPath.startsWith(fullPath)) {
                breadcrumbs.push({
                    label: route.label,
                    href: fullPath,
                });
                
                // เช็คว่า route นี้มี paths ย่อยหรือไม่
                if (route.paths) {
                    route.paths.forEach(subPath => {
                        let fullSubPath = `${fullPath}/${subPath.path}`;
                        if(fullSubPath.includes("[id]") && id){
                            fullSubPath = fullSubPath.replace("[id]",id);
                        }
                        if (currentPath.startsWith(fullSubPath)) {
                            breadcrumbs.push({
                                label: subPath.label,
                                href: fullSubPath,
                            });
                        }
                    });
                }
    
                // ถ้า route นี้มี children ให้ทำการเรียกซ้ำ
                if (route.children) {
                    addBreadcrumbs(route.children, fullPath);
                }
            }
        });
    };
    addBreadcrumbs(routes.slice(1));
    return breadcrumbs;
}
const Breadcrumb = () => {
    const router = usePathname();
    const { id } = useBranchStore();
    if (router === "/") {
        return (
            <div className='flex flex-row'>
                Home
            </div>
        );
    }
    const pathArray = router.startsWith(`/bussinesses/${id}`) ? router.replace(`/bussinesses/${id}`, "").split("/").filter(p => p) : router.split("/").filter(p => p);
    // const breadcrumb = pathArray.map((_, index) => {
    //     const currentPath = `/${pathArray.slice(0, index + 1).join("/")}`;
    //     const label = findMenuLabel(pathArray, menus, index);

    //     return (
    //         <div key={index} className='flex flex-row items-center space-x-2'>
    //             {
    //                 index === (pathArray.length - 1)? (
    //                     <span>{label || currentPath.replace(/-/g, " ").split("/").pop()}</span>
    //                 ) :
    //                     (
    //                         <Link href={currentPath}> {label || currentPath.replace(/-/g, " ").split("/").pop()}</Link>
    //                     )
    //             }
    //             {index < pathArray.length - 1 && <ChevronRight size={16} />}
    //         </div>
    //     );
    // });
    const breadcrumbTrail = generateBreadcrumbs(router,id ?? undefined);
    return (
        <nav className='flex flex-row space-x-2'>
            {breadcrumbTrail.map((crumb, index) => (
                <div key={index} className='flex flex-row items-center space-x-2'>
                    {
                        index === (pathArray.length - 1) ? (
                            <span>{crumb.label}</span>
                        ) :
                            (
                                <Link href={`${crumb.href}`}> {crumb.label}</Link>
                            )
                    }
                    {index < pathArray.length - 1 && <ChevronRight size={16} />}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;