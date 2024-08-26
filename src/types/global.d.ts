

interface IMenu {
    label: string;
    slug:string;
    href: string;
    expanded?:boolean;
    icon?: IconProps['name'];
    children?: IMenu[];
    paths?:IPathMenu[]
}
interface IPathMenu {
    path:string;
    label:string;
}

interface IItemsProduct {
    name:string;
    image:string;
    itemGroup:string;
    price:Number;
}
interface IItemOption {}
interface IItemGroup {}

interface