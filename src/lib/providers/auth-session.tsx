'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStoreModal } from "../hooks/stores/store-modal";
import { Button } from "@/components/ui/button";

const AuthSessionProvider = () => {
    const { data: session, status } = useSession(); // เพิ่ม status
    const storeModal = useStoreModal();
    const router = useRouter();

    useEffect(() => {
        if (!session) { // ตรวจสอบ status ของ session
            storeModal.openModal(
                (
                    <div className='flex flex-col gap-5'>
                        <h1>Time out</h1>
                        <Button className="ml-auto" onClick={() => {
                            router.push("/sign-in");
                            storeModal.closeModal();
                        }}>OK</Button>
                    </div>
                ),
                "Unauthorization"
            );
        }
    }, [session, router, storeModal.open, storeModal.openModal]); // เพิ่ม dependencies ที่สำคัญ

    return null;
}

export default AuthSessionProvider;
