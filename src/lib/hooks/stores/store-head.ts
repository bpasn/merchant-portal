import { create } from "zustand";

interface IStoreHead {
    title:string;
    setTitle:(title:string) => void;
}
export const useStoreHead = create<IStoreHead>()(
    (set,_) => ({
        title:"",
        setTitle:(title) => set({title}),
    })
)