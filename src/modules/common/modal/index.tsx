'use client';
import React from "react";
import { useModalContext } from "@/lib/context/modal-context";
import Modal from "@/components/ui/modal";

const StoreModal = () => {
    const storeModel = useModalContext();
    return (
        <Modal
            title={storeModel.title}
            isOpen={storeModel.open}
            onClose={storeModel.closeModal}
        >
            {storeModel.content}
        </Modal>
    );
};

export default StoreModal;