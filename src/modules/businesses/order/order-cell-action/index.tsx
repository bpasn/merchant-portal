'use client';
import { toast } from '@/components/ui/use-toast';
import { deleteProduct } from '@/lib/services/product.service';
import { report } from '@/lib/utils';
import DropdownAction from '@/modules/common/dropdown-action';
import { Order } from '@/types/order';
import { useRouter } from 'next/navigation';

const OrderAction = ({
    order
}: {
    order: Order;
}) => {
    const router = useRouter();
    const onEdit = () => {

    };
    const onDelete = async () => {
        try {
            // await deleteProduct(stock.productId);
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

export default OrderAction;;