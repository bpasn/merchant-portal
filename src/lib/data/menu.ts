import { IRoute } from "@/types/router-menu";

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
        href: "/businesses/menu",
        root: true,
        paths: [
            { path: "/menu/create", label: "Create Item" },
            { path: "/menu-option/create", label: "Create option Item" },
            { path: "/menu-group/create", label: "Create option Item" },
            { path: "/menu/[edit]", label: "Edit Item" },
            { path: "/menu-option/[edit]", label: "Edit option Item" },
            { path: "/menu-group/[edit]", label: "Edit option Item" },
        ],
    },
    // {
    //     label: "Stock",
    //     slug: "stock",
    //     icon: "ClipboardCheck",
    //     href: "/businesses/stock",
    //     root: true,
        
    // },
    {
        label: "Order",
        slug: "order",
        icon: "ClipboardCheck",
        href: "/businesses/order",
        root: true,
        
    },
    // {
    //     label: "Merchant Report",
    //     slug: "merchant-report",
    //     icon: "ChartArea",
    //     href: "/merchant-report",
    //     children: [
    //         {
    //             label: "Sales",
    //             slug: "sales",
    //             href: "/merchant-report/sales",
    //             children: [
    //                 { label: "Sales1", slug: "sales1", href: "/merchant-report/sales/sales1" },
    //             ],
    //         },
    //         { label: "Item Report", slug: "item-report", href: "/merchant-report/item-report" },
    //         { label: "Promotion", slug: "promotion", href: "/merchant-report/promotion" },
    //         { label: "Branches", slug: "branches", href: "/merchant-report/branches" },
    //     ],
    // },
    // {
    //     label: "Settings",
    //     slug: "settings",
    //     icon: "Settings",
    //     href: "/settings",
    // },
];