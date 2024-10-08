import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriesModal } from "@/lib/schema/categoriesSchema";
import { ProductModal } from "@/lib/schema/productSchema";
import { StockStatusEnum, stockStatusEnum } from "@/lib/schema/productStockSchema";
import { cn, EachElement, report } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image, { StaticImageData } from 'next/image';
import React from "react";
import ProductCellAction from "../component/product-cell-action";
import NoImage from '@/assets/image/no-image.jpg';
import { updateProductStock } from "@/lib/services/manageItem.service";
import { toast, useToast } from "@/components/ui/use-toast";
import { useStoreProgress } from "@/lib/hooks/stores/store-progress";

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
            const [image, setImage] = React.useState<string | StaticImageData>(process.env.NEXT_PUBLIC_DOMAIN_IMAGE + "/" + row.original.productImages[0].uri);
            return (
                <div className="capitalize flex flex-row gap-2 items-center">
                    <div className="relative w-20 h-20 rounded-lg">
                        <Image
                            fill
                            className="object-fill rounded-xl"
                            src={image}

                            alt={""}
                            onError={() => setImage(NoImage)}
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
        maxSize: 100, // ขนาดสูงสุดƒ
        cell({ row }) {
            const [status, setStatus] = React.useState<StockStatusEnum>(row.original.stock.status);
            const storeProgress = useStoreProgress();
            const handleStatusChange = async (newStatus: StockStatusEnum) => {
                storeProgress.inProgress();
                try {
                    await updateProductStock({
                        ...row.original.stock,
                        status: newStatus
                    })
                    setStatus(newStatus);
                    row.original.stock.status = newStatus;
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
                    value={row.original.stock.status}
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