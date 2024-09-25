'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { useStoreModal } from '@/lib/hooks/stores/store-modal';
import { ProductModal } from '@/lib/schema/productSchema';
import { deleteProduct } from '@/lib/services/product.service';
import { report } from '@/lib/utils';
import DropdownAction from '@/modules/common/dropdown-action';
import { ChartSpline } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import StockProductUpdateComponent from '../form/component/stock-product-update-component';

const ProductCellAction = ({
    product
}: {
    product: ProductModal;
}) => {
    const [isPending, startTransition] = useTransition();
    const openModal = useStoreModal(s => s.openModal);
    const router = useRouter();
    const params = useParams();
    const onEdit = () => {
        startTransition(() => {
            router.push(`/businesses/${params.bId}/menu/${product.id}`);
        });
    };
    const onDelete = async () => {
        try {
            await deleteProduct(product.id);
            router.refresh();
        } catch (error) {
            toast({
                title: "ERROR",
                description: report(error),
                duration: 3 * 1000
            });
        }
    };

    const updateStock = () => {
        console.log("update")
        openModal(
            <StockProductUpdateComponent product={product} />,
            product.nameTH,
            {
                dismisOutSide: false,
                dialog:{
                    style:{
                        width:"500px"
                    }
                }
            }
        );
    };
    return (
        <DropdownAction
            onDelete={onDelete}
            onEdit={onEdit}
            dropdownMenuItem={[
                (
                    <DropdownMenuItem onClick={updateStock}>
                        <ChartSpline className="mr-2 h4 w-4" />
                        Stock update
                    </DropdownMenuItem>
                )
            ]}
        />
    );
};

export default ProductCellAction;;