"use client";

import { useStoreHead } from "@/lib/hooks/stores/store-head";
import React, { useEffect } from "react";

const LayoutStock = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const setTitle = useStoreHead(state => state.setTitle);
    useEffect(() => {
        setTitle("Manage Stock");
    },[setTitle])
    return ( 
        <React.Fragment>
            {children}
        </React.Fragment>
     );
};

export default LayoutStock;