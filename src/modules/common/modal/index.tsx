'use client';
import React from "react";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/lib/hooks/stores/store-modal";

const StoreModal = () => {
    const storeModel = useStoreModal();
    return (
        <Modal
            title={storeModel.title}
            isOpen={storeModel.open}
            onClose={storeModel.closeModal}
            description={storeModel.description!}
            dismisOutSide={storeModel.dismisOutSide}
            className={storeModel.className}
        >
            {storeModel.content}
        </Modal>
    );
};

export default StoreModal;