'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useStoreModal } from "../hooks/stores/store-modal";
import { Button } from "@/components/ui/button";

const AuthSessionProvider = () => {
    const { data: session } = useSession(); // เพิ่ม status
    const storeModal = useStoreModal();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    useEffect(() => {
        return () => {
            if(!session){
                storeModal.openModal(
                    (
                        <div className='flex flex-col gap-5'>
                            <h1>Time out</h1>
                            <Button className="ml-auto" onClick={async () => {
                                startTransition(() => {
                                    router.push("/sign-in");
                                });
                                console.log(isPending)
                                storeModal.closeModal();
                            }}>OK</Button>
                        </div>
                    ),
                    "Unauthorization"
                );
            }
        }
    }, [session, router, storeModal.open, storeModal.openModal]); // เพิ่ม dependencies ที่สำคัญ

    return null;
};

export default AuthSessionProvider;
