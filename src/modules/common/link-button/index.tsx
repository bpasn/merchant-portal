'use client';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import type { UrlObject } from 'url';

const LinkButton = ({
    label,
    href,
    className
}: {
    label: string;
    href: string | UrlObject;
    className?: string;
}) => {
    return (
        <Link href={href} className={
            cn(
                " rounded-xl text-[12px] p-2 flex flex-row gap-2 items-center border min-w-[120px]",
                className
            )
        }>
            <Plus size={14} />
            <span>{label}</span>
        </Link>
    );
};

export default LinkButton;