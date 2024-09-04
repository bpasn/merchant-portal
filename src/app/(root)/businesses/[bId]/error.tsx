'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
    }, [error])

    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <h2 className="text-center text-lg">Something went wrong!</h2>
            <p className="text-center text-md">{process.env.NODE_ENV === "development" ? error.message : ""}</p>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    )
}