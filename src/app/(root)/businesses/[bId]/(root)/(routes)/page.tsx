'use client';
import { useEffect } from "react";
import { useStoreModal } from "@/lib/hooks/store-modal";
import StoreForm from "@/modules/businesses/store/form";
const BusinessesRoot = () => {
    const openModal = useStoreModal((state) => state.openModal);
    const open = useStoreModal((state) => state.open);
    useEffect(() => {
        if (!open) {
            openModal((<StoreForm />), "Create Store", {
                description: "Add a new store to manage item"
            });
        }
    }, [open, openModal]);

    return null;
};

export default BusinessesRoot;
