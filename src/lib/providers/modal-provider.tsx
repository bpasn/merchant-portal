'use client';
import React from 'react';
import StoreModal from '@/modules/common/modal';

const ModalProvider = () => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <StoreModal />
    );
};

export default ModalProvider;