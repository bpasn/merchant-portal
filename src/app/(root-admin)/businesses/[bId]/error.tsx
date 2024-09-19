'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'
import { useStoreModal } from '@/lib/hooks/stores/store-modal'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const { open, openModal, closeModal } = useStoreModal();
    useEffect(() => {
        if (!open) {
            openModal((
                <div className='flex flex-col'>
                    {error.message}
                    <Button onClick={() => {
                        reset();
                        closeModal()
                    }}>OK</Button>
                </div>
            ), error.name)
        }
    }, [error, open, openModal])

    return null;

}