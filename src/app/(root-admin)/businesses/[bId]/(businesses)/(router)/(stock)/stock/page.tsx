import { getProductStock } from "@/lib/services/product.service";
import StockModule from "@/modules/businesses/stock";


const StockPage = async ({ params }: {
    params: {
        bId: string;
    };
}) => {
    const productStock = await getProductStock(params.bId);
    return (
        <StockModule data={productStock} />
    );
};

export default StockPage;