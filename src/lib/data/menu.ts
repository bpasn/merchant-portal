import { IRoute } from "@/types/global";
import { BadgePercent, ChartArea, HomeIcon, List, Settings } from "lucide-react";

export const routes: IRoute[] = [
    {
        label: "Home",
        slug: "home",
        href: "/",
        icon: "House",
        root: true, // Root for breadcrumb
    },
    {
        label: "Manage items",
        slug: "manage-items",
        icon: "List",
        href: "/bussinesses",
        root: true,
        paths: [
            { path: "[id]/menu/", label: "Create Item" },
            { path: "[id]/menu-option/", label: "Create option Item" },
            { path: "[id]/menu-group/", label: "Create option Item" },
        ],
    },
    {
        label: "Merchant Report",
        slug: "merchant-report",
        icon: "ChartArea",
        href: "/merchant-report",
        children: [
            {
                label: "Sales",
                slug: "sales",
                href: "/merchant-report/sales",
                children: [
                    { label: "Sales1", slug: "sales1", href: "/merchant-report/sales/sales1" },
                ],
            },
            { label: "Item Report", slug: "item-report", href: "/merchant-report/item-report" },
            { label: "Promotion", slug: "promotion", href: "/merchant-report/promotion" },
            { label: "Branches", slug: "branches", href: "/merchant-report/branches" },
        ],
    },
    {
        label: "Settings",
        slug: "settings",
        icon: "Settings",
        href: "/settings",
    },
];