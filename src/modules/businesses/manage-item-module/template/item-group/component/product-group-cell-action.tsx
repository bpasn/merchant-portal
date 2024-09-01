import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ProductGroupSchema } from '@/lib/schema/productGroupSchema';
import { MoreHorizontal, Copy, Edit2, Trash } from 'lucide-react';
import React from 'react';

type Props = {};

const ProductGroupAction = ({
    group
}: {
    group: ProductGroupSchema;
}) => {
    const onCopy = () => {};
    const onEdit = () => {};
    const onDelete = () => {}
    return (
        <>
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
                    <DropdownMenuItem onClick={onCopy}>
                        <Copy className="mr-2 h4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit2 className="mr-2 h4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash className="mr-2 h4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ProductGroupAction;