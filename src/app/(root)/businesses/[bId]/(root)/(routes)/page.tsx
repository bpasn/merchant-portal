'use client'
import { useCallback, useEffect } from "react";
import { useStoreModal } from "@/lib/hooks/store-modal";
import StoreForm from "@/modules/businesses/store/form";
const BusinessesRoot = () => {
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

export default BusinessesRoot;
