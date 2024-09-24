import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EachElement } from "@/lib/utils";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";
import React from "react";

interface DropdownActionProps {
    onEdit: () => void;
    onDelete: () => void;
    dropdownMenuItem?: React.ReactElement<typeof DropdownMenuItem>[];
}
const DropdownAction = ({
    onDelete,
    onEdit,
    dropdownMenuItem
}: DropdownActionProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Open menu */}
                <Button
                    variant={"ghost"}
                    className="h-8 w-8 p-0 border"
                >
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4 " />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={onEdit}>
                    <Edit2 className="mr-2 h4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>
                    <Trash className="mr-2 h4 w-4" />
                    Delete
                </DropdownMenuItem>
                {dropdownMenuItem?.map((element,index) => {
                    return (
                    <React.Fragment key={index}>
                        {element}
                    </React.Fragment>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownAction;