'use client';
import {
    Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormFieldCommon } from '@/modules/common/form-field';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from 'zod';
import Link from 'next/link';
const userSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
});
type UserSchema = z.infer<typeof userSchema>;
const LoginForm = () => {
    const form = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {

        }
    });
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center spce-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl-font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">User your email and password to sign in</p>
                </div>
                <Form {...form}>
                    <form className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                        <FormFieldCommon
                            label='Email address'
                            placeholder='user@ec.com'
                            control={form.control}
                            name="email"
                        />
                        <FormFieldCommon
                            label='PASSWORD'
                            placeholder=' '
                            control={form.control}
                            name="password"
                        />

                        <Button>Sign in</Button>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account? <Link href="/sign-up" className='font-semibold text-gray-800'>Sign up</Link> forfree
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;