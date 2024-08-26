import { ColumnDef } from "@tanstack/react-table";
import {
    Checkbox
} from "@/components/ui/checkbox";

export const columnItems: ColumnDef<Omit<IItemsProduct,"image">>[] = [
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
        accessorKey: "name",
        header: "Item",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        )
    },
    {
        accessorKey: "itemGroup",
        header: "Item group"
    },
    {
        accessorKey: "price",
        header: "Price"
    }
];