'use client';
import { toast } from '@/components/ui/use-toast';
import { useStoreModal } from '@/lib/hooks/stores/store-modal';
import { deleteProduct } from '@/lib/services/product.service';
import { report } from '@/lib/utils';
import DropdownAction from '@/modules/common/dropdown-action';
import { IProductStockModel } from '@/types/product-stock';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import StockUpdateForm from '../component/stock-update-form';

const StockProductAction = ({
    stock
}: {
    stock: IProductStockModel;
}) => {
    const [isPending, startTransition] = useTransition();
    const openModal = useStoreModal(s => s.openModal);
    const router = useRouter();
    const onEdit = () => {
        openModal(
            StockUpdateForm(),
            stock.productName,

        );
    };
    const onDelete = async () => {
        try {
            await deleteProduct(stock.productId);
            router.refresh();
        } catch (error) {
            toast({
                title: "ERROR",
                description: report(error),
                duration: 3 * 1000
            });
        }
    };
    return (
        <DropdownAction onDelete={onDelete} onEdit={onEdit} />
    );
};

export default StockProductAction;;