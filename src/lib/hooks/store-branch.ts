import { create } from "zustand";

interface IBranchProps {
    id?: string | null;
    setId: (id: string) => void;
    branchs: IBranch[];
    setBranch: (branch: IBranch[]) => void;
}
export const useBranchStore = create<IBranchProps>()(
    (set, get) => ({
        id: null,
        setId: (id: string) => set({ id }),
        branchs: [],
        setBranch: (branchs: IBranch[]) => set({ branchs }),

    })
);