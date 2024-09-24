import { create } from 'zustand';

interface IOptionStoreModal {
    description?: string;
    dismisOutSide: boolean;
    dialog?: {
        className?: string;
        style?: React.CSSProperties;
    };
}
interface StoreModalProps {
    open: boolean;
    openModal: (content: React.ReactNode, title: string, options?: IOptionStoreModal) => void;
    closeModal: () => void;
    className?: string;
    content: React.ReactNode;
    title: string;
    description?: string | null;
    style?: React.CSSProperties,
    dismisOutSide: boolean;
}
export const useStoreModal = create<StoreModalProps>()((set, get) => ({
    open: false,
    dismisOutSide: true,
    openModal: (content: React.ReactNode, title: string, options?: IOptionStoreModal) => {
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
        set({ open: false, content: null, title: "", description: "", style: {}, dismisOutSide: true });
    },
    style: {},
    content: null,
    title: "",
    description: "",
})); 