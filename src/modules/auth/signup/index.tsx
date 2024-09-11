'use client';
import React from 'react';
import {
    Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormFieldCommon } from '@/modules/common/form-field';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Link from 'next/link';
import { useForm } from "react-hook-form";
const signUpSchema = z.object({
    email: z.string().min(1, { message: "Email is require" }),
    name: z.string().min(1, { message: "Name is require" }),
    password: z.string().min(1, { message: "Password is require" })
});

type SignUpSchema = z.infer<typeof signUpSchema>;
const SignUpForm = () => {
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    });
    const handleSave = (data: SignUpSchema) => {
        console.log(data);
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
                        />
                        <FormFieldCommon
                            label='Email address'
                            placeholder='user@ec.com'
                            control={form.control}
                            name="email"
                        />
                        <FormFieldCommon
                            label='PASSWORD'
                            control={form.control}
                            name="password"
                        />

                        <Button variant={"outline"}>Sign in</Button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account? <Link href="/sign-in" className='font-semibold text-gray-800'>Sign in</Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>);
};

export default SignUpForm;