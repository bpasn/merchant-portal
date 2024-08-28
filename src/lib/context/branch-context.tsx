'use client';
import React, { useContext } from "react";

interface IBranchContext {
    id?: string | null;
    setId?: React.Dispatch<React.SetStateAction<string | null>>;
}
const BranchContext = React.createContext<IBranchContext>({
    id: null
});

export const BranchProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [id, setId] = React.useState<string | null>("1234");
    return (
        <BranchContext.Provider value={{ id, setId }}>{children}</BranchContext.Provider>
    );
};

const useBranchContext = () => {
    const context = useContext(BranchContext);
    if(context == null) {
        throw new Error("useBranchContext must be used within a BranchProvider")
    }
    return context;
}

export default useBranchContext;