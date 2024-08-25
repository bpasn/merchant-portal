import { createContext, useContext, useState } from "react";

interface SideBarContextProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBarContext = createContext<SideBarContextProps | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: React.ReactNode; }) => {
    const [open, setOpen] = useState(false);
    return (
        <SideBarContext.Provider value={{ open, setOpen }}>
            {children}
        </SideBarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SideBarContext);
    if(!context){
        throw new Error("useSideContext must be used within a SideBarProvider")
    }
    return context;
}