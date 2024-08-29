'use client';
import React, { useContext } from "react";

interface IBranchContext {
    id?: string | null;
    setId: React.Dispatch<React.SetStateAction<string | null>>;
    branchs: IBranch[];
    setBranch:React.Dispatch<React.SetStateAction<IBranch[]>>;
}
const BranchContext = React.createContext<IBranchContext | null>(null);

export const BranchProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [id, setId] = React.useState<string | null>(null);
    const [branchs, setBranch] = React.useState<IBranch[]>([]);
    return (
        <BranchContext.Provider value={{ id, setId, branchs, setBranch }}>{children}</BranchContext.Provider>
    );
};

const useBranchContext = () => {
    const context = useContext(BranchContext);
    if (context == null) {
        throw new Error("useBranchContext must be used within a BranchProvider");
    }
    return context;
};

export default useBranchContext;