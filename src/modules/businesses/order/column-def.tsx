import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Order } from "@/types/order";
import OrderAction from "./order-cell-action";

export const columnDefOrder: ColumnDef<Order>[] = [
    {
        header: "Order Id.",
        accessorKey: "id",
        meta: {
            style: {
                textAlign: "left",
                width: 350
            }
        },

    },
    {
        header: "Order Status.",
        accessorKey: "orderStatus",
    },
    {
        header: "Total Amount",
        accessorKey: "totalAmount",
        meta: {
            style: {
                textAlign: "center"
            }
        },
        cell: ({ renderValue }) => {
            return (
                <div className="text-center">
                    {renderValue() as string}
                </div>
            )
        }
    },
    
    {
        header: "Create At",
        accessorKey: "createdAt",
    },
    {
        header: "Update At",
        accessorKey: "updatedAt",
    },
    {
        header: "Action",
        size: 100, // ความกว้างเริ่มต้น 150px
        cell({ row }) {
            return (
                <OrderAction order={row.original} />
            );
        }
    }

];
