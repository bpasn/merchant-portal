interface IItemsProduct {
    name: string;
    image: string;
    itemGroup: string;
    price: Number;
}
interface IItemOption { }
interface IItemGroup { }

interface IBranch {
    id: string;
    name: string;
}

interface IDataTable<T> {
    content: T[];
    pageable: IPageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size: number;
    size: number;
    number: number,
    sort: ISortPageable,
    empty: boolean;

}
interface IPageable {
    pageNumber: number;
    pageSize: number;
    sort: ISortPageable;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

interface ISortPageable {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}