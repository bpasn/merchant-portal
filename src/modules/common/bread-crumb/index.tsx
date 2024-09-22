'use client';
import { routes } from '@/lib/data/menu';
import { IRoute } from '@/types/router-menu';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

function generateBreadcrumbs(currentPath: string, id?: string, editId?: string): IRoute[] {
    let breadcrumbs: any = [];
    const addBreadcrumbs = (routes: IRoute[], parentPath = "") => {
        routes.forEach(route => {
            let fullPath = `${parentPath}${route.href}`;
            // จับคู่เส้นทางที่มี [id]
            if (fullPath.includes("[id]") && id) {
                fullPath = fullPath.replace("[id]", id);
            }
            if (fullPath.startsWith("/businesses")) {
                fullPath = fullPath.split('/').map((segment, index) => index === 1 ? `${segment}/${id}` : segment).join('/');
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
                        let fullSubPath = `${fullPath.split("/").slice(0, -1).join("/")}${subPath.path}`;

                        // Replace [id] with actual id if exists
                        if (fullSubPath.includes("[edit]") && (editId && editId !== 'create')) {
                            fullSubPath = fullSubPath.replace("[edit]", editId.toString());
                        }

                        // Check if the current path starts with fullSubPath
                        if (currentPath.startsWith(fullSubPath)) {
                            breadcrumbs.push({
                                label: subPath.label,
                                href: fullSubPath
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
    const params = useParams();
    if (router === "/") {
        return (
            <div className='flex flex-row'>
                Home
            </div>
        );
    }

    const pathArray = router.split("/").filter(p => p);
    const bId = params.bId?.toString();
    const breadcrumbTrail = generateBreadcrumbs(router, bId, params.editId as string);
    return (
        <nav className='flex flex-row space-x-2'>
            {breadcrumbTrail.map((crumb, index) => {
                return (
                    <div key={index} className='flex flex-row items-center space-x-2 text-xs'>
                        {
                            index === (pathArray.length - 1) ? (
                                <span>{crumb.label}</span>
                            ) :
                                (
                                    <a href={`${crumb.href}`}> {crumb.label}</a>
                                )
                        }
                        {(index + 1) <= (breadcrumbTrail.length - 1) && <ChevronRight size={14} />}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;