import NoImage from '@/assets/image/no-image.jpg';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useStoreProgress } from "@/lib/hooks/stores/store-progress";
import { CategoriesModal } from "@/lib/schema/categoriesSchema";
import { ProductModal } from "@/lib/schema/productSchema";
import { StockStatusEnum, stockStatusEnum } from "@/lib/schema/productStockSchema";
import { updateProductStock } from "@/lib/services/product.service";
import { cn, EachElement, report } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image, { StaticImageData } from 'next/image';
import React from "react";
import ProductCellAction from "../product-cell-action";
import ImageProvider from '@/modules/common/image-provider';

export const columnItems: ColumnDef<ProductModal>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(v) => table.toggleAllPageRowsSelected(!v)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(v) => row.toggleSelected(!!v)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false
    // },
    {
        accessorKey: "nameTH",
        header: "Item",
        size: 300,

        cell: ({ row }) => {
            return (
                <div className="capitalize flex flex-row gap-2 items-center">
                    <div className="relative w-20 h-20 rounded-lg">
                        <ImageProvider
                            fill
                            className="object-fill rounded-xl"
                            src={row.original.productImages[0].source}
                        />
                    </div>
                    <p>{row.getValue("nameTH")}</p>
                </div>
            );
        }
    },
    {
        accessorKey: "categories",
        header: "Item group",
        cell({ row }) {
            return (
                <div className="capitalize">{(row.getValue("categories") as CategoriesModal[]).map(e => e.name).join(",")}</div>
            );
        },
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        header: "Item status",
        size: 100, // ความกว้างเริ่มต้น
        minSize: 100, // ขนาดขั้นต่ำ
        maxSize: 100, // ขนาดสูงสุด
        accessorKey:"stock.status",
        cell(cell) {
            const [status, setStatus] = React.useState<StockStatusEnum>(cell.getValue() as StockStatusEnum);
            const storeProgress = useStoreProgress();
            const handleStatusChange = async (newStatus: StockStatusEnum) => {
                storeProgress.inProgress();
                try {
                    await updateProductStock({
                        ...cell.row.original.stock,
                        status: newStatus
                    })
                    setStatus(newStatus);
                    cell.row.original.stock.status = newStatus;
                } catch (error) {
                    toast({
                        title: "ERROR",
                        description: report(error)
                    })
                } finally {
                    storeProgress.done();
                }
            };
            return (
                <Select
                    value={cell.row.original.stock.status}
                    onValueChange={handleStatusChange}>
                    <SelectTrigger className={
                        cn(
                            "w-[157px] h-[35px] rounded-lg flex flex-row gap-4 p-3 justify-start focus:ring-0 ring-offset-0",
                            generateClass(status),
                        )
                    }>
                        <SelectValue placeholder={"choice.status"} className="text-start" />
                    </SelectTrigger>
                    <SelectContent>
                        <EachElement
                            of={stockStatusEnum.options}
                            render={(status) => (
                                <SelectItem key={status} value={status}>{status.toUpperCase().replaceAll("_", " ")}</SelectItem>
                            )}
                        />
                    </SelectContent>
                </Select >
            );
        }
    },
    {
        header: " ",
        size: 100, // ความกว้างเริ่มต้น 150px
        cell({ row }) {
            return (
                <ProductCellAction product={row.original} />
            );
        }
    }
];

const generateClass = (status: StockStatusEnum): string => {
    switch (status) {
        case stockStatusEnum.enum.IN_STOCK:
            return "text-[rgba(0,168,56)] bg-[rgba(0,168,56)]/30";
        case stockStatusEnum.enum.OUT_OF_STOCK:
            return "text-[rgba(123,132,136)] bg-[rgba(123,132,136)]/30";
        case stockStatusEnum.enum.LOW_STOCK:
            return "text-orange-700 bg-orange-100";
        default:
            return "";
    }
}