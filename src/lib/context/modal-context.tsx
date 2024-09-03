import React, { createContext, useContext } from "react";

interface ModalStoreContextProps {
    open: boolean;
    openModal: (content: React.ReactNode, title: string, options?: { description?: string }) => void;
    closeModal: () => void;
    content: React.ReactNode;
    title: string;
    description?: string | null;
}

const ModelStoreContext = createContext<ModalStoreContextProps | null>(null);

export const ModelStoreProvider = ({ children }: { children: React.ReactNode; }) => {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState<React.ReactNode>(null);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState<string | null>(null);

    const openModal = (content: React.ReactNode, title: string, options?: { description?: string | null; }) => {
        setContent(content);
        setTitle(title);
        setOpen(true);
        setDescription(options?.description!);
    };

    const closeModal = () => setOpen(false);

    return (
        <ModelStoreContext.Provider value={{
            open,
            openModal,
            closeModal,
            content,
            title,
            description
        }}>
            {children}
        </ModelStoreContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModelStoreContext);
    if (!context) throw new Error("ModalStoreContext must be used within a ModalStoreProvider");
    return context;
};
