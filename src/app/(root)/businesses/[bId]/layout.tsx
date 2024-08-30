'use client'
import useBranchContext from '@/lib/context/branch-context';
import React, { useEffect } from 'react'


const layout = ({
    params,
    children
}: {
    params: {
        bId: string
    };
    children: React.ReactNode
}) => {
    const branch = useBranchContext();
    useEffect(() => {
        if (branch.id !== params.bId) {
            branch.setId(params.bId);
        }
    }, [])
    return (
        <div>{children}</div>
    )
}

export default layout