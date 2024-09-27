'use client';
import { ProductSchema } from '@/lib/schema/productSchema';
import { stockUnitTypeEnum, stockStatusEnum } from '@/lib/schema/productStockSchema';
import { FormFieldCommon, FormSelectCommon } from '@/modules/common/form-field';
import React from 'react';
import { Control } from 'react-hook-form';


const StockFormComponent = ({
    control,
    stock
}: {
    control: Control<ProductSchema>,
    stock: ProductSchema["stock"] | null | undefined;
}) => {
    return (
        <div className="content-container px-8 py-8 flex flex-col gap-5 ">
            <div className="flex flex-row">
                <h2 className='font-bold text-md'>Stock</h2>
            </div>
            <div className="flex flex-col gap-3 max-w-[250px]">
                <FormSelectCommon
                    control={control}
                    options={stockUnitTypeEnum.options.map(option => ({ value: option, label: option }))}
                    name={"stock.unitType"}
                    defaultValue={stock?.unitType ? stock.unitType : stockUnitTypeEnum.Values.PIECE}
                    label={"Unit type"}
                />
                <FormFieldCommon
                    control={control}
                    name={"stock.unitQuantity"}
                    label="Unit quantity"
                />
                <FormFieldCommon
                    control={control}
                    name={"stock.quantity"}
                    label="Quantity"
                />
                <FormSelectCommon
                    control={control}
                    options={stockStatusEnum.options.map(option => ({ value: option, label: option }))}
                    defaultValue={stock?.status ? stock.status : stockStatusEnum.Values.IN_STOCK}
                    name={"stock.status"}
                    label={"Status"}
                />


            </div>
        </div>
    );
};

export default StockFormComponent;