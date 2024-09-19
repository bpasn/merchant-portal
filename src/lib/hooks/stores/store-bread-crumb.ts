import { create } from "zustand";

interface StoreBreadCrumb {
    onRoute: () => void;
}
export const useStoreBreadCrumb = create<StoreBreadCrumb>()(
    (set, _) => ({
        onRoute:() => {}
    })
)