'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { report } from '@/lib/utils';
import { FormFieldCommon } from '@/modules/common/form-field';
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
const userSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).regex(RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g), { message: "Email invalid format" }),
    password: z.string().min(1, { message: "Password is required" }).regex(RegExp(/^(?=.*[0-9])(?=.*[a-x])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/), { message: "Password invalid format" })
});
type UserSchema = z.infer<typeof userSchema>;
const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();
    const form = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });
    const handleSave = async (data: UserSchema) => {
        setLoading(true);
        // เรียกใช้งาน signIn ด้วย redirect: false อย่างชัดเจน
        try {
            const response = await signIn("spring-credential", {
                email: data.email,
                password: data.password,
                redirect: false, // ยืนยันว่ามี redirect: false,
            });
            // ตรวจสอบว่าการยืนยันตัวตนสำเร็จหรือไม่
            if (response?.ok) {
                // ตัวอย่าง: redirect ไปหน้าอื่นถ้าจำเป็น
                router.push('/');
            }
            // จัดการข้อผิดพลาดและแสดง toast อย่างเหมาะสม
            if (response?.error) {
                toast({
                    title: "Exception",
                    description: response.error, // แสดงข้อผิดพลาดที่ถูกต้อง
                    variant: "destructive",
                    duration: 3 * 1000
                });
            }
        } catch (error) {
            toast({
                title: "Exception",
                variant: "destructive",
                description: report(error)
            });
        } finally {
            setLoading(false);
        }

    };



    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center spce-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl-font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">User your email and password to sign in</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                        <FormFieldCommon
                            disabled={loading}
                            label='Email address'
                            placeholder='user@ec.com'
                            control={form.control}
                            name="email"
                        />
                        <FormFieldCommon
                            disabled={loading}
                            label='PASSWORD'
                            type="password"
                            control={form.control}
                            name="password"
                        />

                        <Button
                            disabled={loading}
                            variant={"outline"}>Sign in</Button>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account? <Link href="/sign-up" className='font-semibold text-gray-800'>Sign up</Link> forfree
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;