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
                <div className='flex flex-col gap-3'>
                    {error.message}
                    <Button onClick={() => {
                        window.location.assign("/")
                        
                    }}>RESET</Button>
                </div>
            ), error.name)
        }
        return () => {
            if(open){
                closeModal()
            }
        }
    }, [error, open, openModal])

    return null;

}