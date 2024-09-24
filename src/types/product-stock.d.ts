import { StockStatusEnum, StockUnitTypeEnum } from "@/lib/schema/productStockSchema";

interface IProductStockModel {
    unitType: StockUnitTypeEnum;
    unitQuantity: number;
    quantity: number;
    stockId: string;
    stockStatus: StockStatusEnum;
    productId: string;    
    productCreated: Date;
    productPrice: number;
    productName: string;
    productUpdated: Date;
    productImage:string;
}