'use client';
import { useStoreModal } from '@/lib/hooks/store-modal';
import StoreForm from '@/modules/businesses/store/form';
import React, { useCallback, useEffect } from 'react';

type Props = {};

const TestComponent = (props: Props) => {
    const openModal = useStoreModal((state) => state.openModal);
    const open = useStoreModal((state) => state.open);

    const store = useCallback(async () => {
        if (!open) {
            openModal((<StoreForm />), "Create Store", {
                description: "Add a new store to manage item"
            });
        }
    }, [open, openModal]);
    
    useEffect(() => {
        store();
    }, [store()]);
    return null;
};

export default TestComponent;