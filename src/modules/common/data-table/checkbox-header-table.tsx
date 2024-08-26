import { Checkbox } from '@/components/ui/checkbox';
import { Table } from '@tanstack/react-table';
import React from 'react';

type Props = {};

const CheckBoxHeaderTable = ({
    getIsAllPageRowsSelected,
    getIsSomePageRowsSelected,
    toggleAllPageRowsSelected
}: Table<IItemsProduct>) => {
    return (
        <Checkbox
            checked={
                getIsAllPageRowsSelected() || (getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(v) => toggleAllPageRowsSelected(!v)}
            aria-label="Select all"
        />
    );
};

export default CheckBoxHeaderTable;