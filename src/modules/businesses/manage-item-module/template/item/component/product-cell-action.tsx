'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ProductModal } from '@/lib/schema/productSchema';
import { Edit2, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';


const ProductCellAction = ({
    product
}: {
    product: ProductModal;
}) => {
    const router = useRouter();
    const params = useParams();
    const onEdit = () => {
        router.push(`/businesses/${params.bId}/menu/${product.id}`);
    };
    const onDelete = () => { };
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
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit2 className="mr-2 h4 w-4" />
                        Edit
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

export default ProductCellAction;