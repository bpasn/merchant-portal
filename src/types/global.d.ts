
interface IMenu {
    label: string;
    slug:string;
    href: string;
    expanded?:boolean;
    icon?: IconProps['name'];
    children?: IMenu[];
}