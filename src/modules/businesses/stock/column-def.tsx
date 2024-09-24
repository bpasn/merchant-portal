import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useStoreProgress } from "@/lib/hooks/stores/store-progress";
import { StockStatusEnum, stockStatusEnum } from "@/lib/schema/productStockSchema";
import { cn, EachElement, report } from "@/lib/utils";
import { IProductStockModel } from "@/types/product-stock";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import StockProductAction from "./stock-cell-action";
import Image, { StaticImageData } from 'next/image';
import NoImage from '@/assets/image/no-image.jpg';
export const columnDefStock: ColumnDef<IProductStockModel>[] = [
    {
        header: "Product Name",
        accessorKey: "productName",
        meta: {
            style: {
                textAlign: "left",
                width:300
            }
        },
        cell: ({ row, getValue }) => {
            const [image, setImage] = React.useState<string | StaticImageData>(process.env.NEXT_PUBLIC_DOMAIN_IMAGE + "/" + row.original.productImage);
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
                    <p>{getValue() as string}</p>
                </div>
            );
        }
    },
    {
        header: "Product Price",
        accessorKey: "productPrice",
        meta: {
            style: {
                textAlign: "center",
            }
        },
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as string}</div>
        )
    },

    {
        header: "Unit Type",
        meta: {
            style: {
                textAlign: "center",
            }
        },
        accessorKey: "unitType",
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as string}</div>
        )
    },
    {
        header: "Unit Qty",
        meta: {
            style: {
                textAlign: "center",
            }
        },
        accessorKey: "unitQuantity",
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as string}</div>
        )
    },
    {
        header: "Quantity",
        meta: {
            style: {
                textAlign: "center",
            }
        },
        accessorKey: "quantity",
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as string}</div>
        )
    },
    {
        header: "Stock Status",
        accessorKey: "stockStatus",
        cell: ({ row, ...cell }) => {
            const [status, setStatus] = React.useState<StockStatusEnum>(cell.getValue() as StockStatusEnum);
            const storeProgress = useStoreProgress();
            const handleStatusChange = async (newStatus: StockStatusEnum) => {
                storeProgress.inProgress();
                try {
                    setStatus(newStatus);
                    row.original.stockStatus = newStatus;
                } catch (error) {
                    toast({
                        title: "ERROR",
                        description: report(error)
                    });
                } finally {
                    storeProgress.done();
                }
            };
            return (
                <Select
                    value={status as string}
                    onValueChange={handleStatusChange}>
                    <SelectTrigger className={
                        cn(
                            "w-[157px] h-[35px] rounded-lg flex flex-row gap-4 p-3 justify-start focus:ring-0 ring-offset-0",
                            generateClass(status as StockStatusEnum),
                        )
                    }>
                        <SelectValue placeholder={status} className="text-start" />
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
        header: "Action",
        size: 100, // ความกว้างเริ่มต้น 150px
        cell({ row }) {
            return (
                <StockProductAction stock={row.original} />
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
};