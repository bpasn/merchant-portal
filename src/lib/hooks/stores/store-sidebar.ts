import { create } from "zustand";

interface SideBarContextProps {
    open: boolean,
    setOpen: (o:boolean) => void;
}

export const useSidebarStore = create<SideBarContextProps>()(
    (set, get) => ({
        open: false,
        setOpen: (o) => set({ open: o })
    })
);

