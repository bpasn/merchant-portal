import { create } from 'zustand';

interface StoreModalProps {
    open: boolean;
    openModal: (content: React.ReactNode, title: string, options?: { description?: string; }) => void;
    closeModal: () => void;
    content: React.ReactNode;
    title: string;
    description?: string | null;
}
export const useStoreModal = create<StoreModalProps>()((set, get) => ({
    open: false,
    openModal: (content: React.ReactNode, title: string, options?: { description?: string; }) => {
        set({
            content,
            title,
            description: options?.description,
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