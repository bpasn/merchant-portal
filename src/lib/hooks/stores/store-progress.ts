import { create } from "zustand";

interface IStoreProgress {
    loading: boolean;
    inProgress: () => void;
    done: () => void;
}
export const useStoreProgress = create<IStoreProgress>()(
    (set, _) => ({
        loading: false,
        inProgress: () => set({ loading: true }),
        done: () => set({ loading: false })
    })
);


