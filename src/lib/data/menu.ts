import { BadgePercent, ChartArea, HomeIcon, List, Settings } from "lucide-react";

export const menus: IMenu[] = [
    {
        label: "Home",
        slug: "home",
        icon: "House",
        href: "/",
    },
    {
        label: "Manage items",
        slug: "manage-items",
        icon: "List",
        href: "/manage-items",
    },
    {
        label: "Promotion",
        slug: "",
        icon: "BadgePercent",
        href: "/",
    },
    {
        label: "Merchant Report",
        slug: "",
        href: "/",
        icon: "ChartArea",
        expanded:false,
        children: [
            {
                label: "Sales",
                slug: "",
                href: "/",
                expanded:false,
                children: [
                    {
                        label: "Sales1",
                        slug: "",
                        href: "/",
                    }
                ]
            },
            {
                label: "Item report",
                slug: "",
                href: "/",
            },
            {
                label: "Promotion",
                slug: "",
                href: "/",
            },
            {
                label: "Branches",
                slug: "",
                href: "/",
            },
        ]
    },
    {
        label: "setting",
        slug: "",
        icon: "Settings",
        href: "/",
    },
];