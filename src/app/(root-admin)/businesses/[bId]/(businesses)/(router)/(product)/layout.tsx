'use client';
import { Suspense, useEffect } from "react";
import TabsClient from "../../../component/tabs-client";
import { useStoreHead } from "@/lib/hooks/stores/store-head";

const ProductLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const setTitle = useStoreHead(state => state.setTitle);

    useEffect(() => {
        setTitle("Manage Item");
    }, [setTitle]);
    return (
        <Suspense fallback={<>TabsClient</>}>
            <TabsClient> {children}</TabsClient>
        </Suspense>
    );
};

export default ProductLayout;