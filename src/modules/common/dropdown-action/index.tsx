import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import IconLucide from "@/lib/hooks/icon-lucide";
import { cn, EachElement } from "@/lib/utils";
import { IconName } from "@/types/icon";
import { Edit2, Trash } from "lucide-react";
import React from "react";

interface DropdownActionProps {
    onEdit: () => void;
    onDelete: () => void;
    dropdownMenuItem?: React.ReactElement<typeof DropdownMenuItem>[];
    icon?: IconName;
    iconClass?: string;
    iconVariant?: React.ComponentPropsWithoutRef<typeof Button>['variant']
}
const DropdownAction = ({
    onDelete,
    onEdit,
    dropdownMenuItem,
    icon = "Ellipsis",
    iconClass,
    iconVariant = "ghost"
}: DropdownActionProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Open menu */}
                <Button
                    variant={iconVariant}
                    className={cn("h-8 w-8 p-0 border", iconClass)}
                >
                    <IconLucide name={icon} className="" size={18} cursor={"pointer"}/>
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
                {dropdownMenuItem?.map((element, index) => {
                    return (
                        <React.Fragment key={index}>
                            {element}
                        </React.Fragment>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu >
    );
};

export default DropdownAction;