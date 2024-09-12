'use client';
import React, { useState } from 'react';
import {
    Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormFieldCommon } from '@/modules/common/form-field';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import axiosClient from '@/lib/utils/axios-client';
import { toast } from '@/components/ui/use-toast';
import { report } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const signUpSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).regex(RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g), { message: "Email invalid format" }),
    password: z.string().min(1, { message: "Password is required" }).regex(RegExp(/^(?=.*[0-9])(?=.*[a-x])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/), { message: "Password invalid format" }),
    name: z.string().min(1, { message: "Name is require" }),
});

type SignUpSchema = z.infer<typeof signUpSchema>;
const SignUpForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    });
    const handleSave = async (data: SignUpSchema) => {
        setLoading(true)
        try {
            const { data: auth } = await axiosClient.post<{ status: string }>("/api/auth/sign-up", data);
            if (auth.status === "OK") {
                router.push("/sign-in")
            }
        } catch (error) {
            toast({
                title: "Exception",
                description: report(error),
                variant: "destructive"
            })
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center spce-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl-font-semibold">Sign Up</h3>
                    <p className="text-sm text-gray-500">Create an account with your email name and password</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                        <FormFieldCommon
                            label='NAME'
                            control={form.control}
                            name="name"
                            disabled={loading}
                        />
                        <FormFieldCommon
                            label='Email address'
                            placeholder='user@ec.com'
                            control={form.control}
                            name="email"
                            disabled={loading}
                        />
                        <FormFieldCommon
                            label='PASSWORD'
                            control={form.control}
                            type="password"
                            name="password"
                            disabled={loading}
                        />

                        <Button variant={"outline"} disabled={loading}>Sign in</Button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account? <Link href="/sign-in" className='font-semibold text-gray-800'>Sign in</Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignUpForm;