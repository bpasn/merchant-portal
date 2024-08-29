import { icons } from "lucide-react";
import { IconName } from "./icon";

interface IRoute {
    label: string;
    slug?: string;
    href: string;
    icon?: IconName;
    root?: boolean; // To mark breadcrumb roots
    paths?: ISubPath[]; // For paths like create, edit under manage-items
    children?: IRoute[];
}

interface ISubPath {
    path: string;
    label: string;
}