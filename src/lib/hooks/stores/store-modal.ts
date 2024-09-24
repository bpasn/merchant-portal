import { create } from 'zustand';

interface StoreModalProps {
    open: boolean;
    openModal: (content: React.ReactNode, title: string, options?: { description?: string; dismisOutSide: boolean;dialog?: { className?: string; }; }) => void;
    closeModal: () => void;
    className?: string;
    content: React.ReactNode;
    title: string;
    description?: string | null;
    dismisOutSide: boolean;
}
export const useStoreModal = create<StoreModalProps>()((set, get) => ({
    open: false,
    dismisOutSide: true,
    openModal: (content: React.ReactNode, title: string, options?: { description?: string; dismisOutSide: boolean; dialog?: { className?: string; }; }) => {
        set({
            content,
            title,
            description: options?.description,
            dismisOutSide: options?.dismisOutSide,
            className: options?.dialog?.className,
            open: true
        });
    },
    closeModal: () => {
        set({ open: false });
    },
    content: null,
    title: "",
    description: ""
})); 