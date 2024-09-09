'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import UploadSVG from '@/assets/image/upload.svg';
import { Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EachElement } from '@/lib/utils';

interface FileUploadProps {
    value: File[] | string[];
    onChange: (file: File) => void;
}
const FileUpload: React.FC<FileUploadProps> = ({
    value,
    onChange
}) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        fileRef.current?.click();
    };

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                onChange(files.item(i)!);
            }
        }
    };

    const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                onChange(files.item(i)!);
            }
        }
    };

    const deleteImage = (id:string) => {
        
    }
    return (
        <div className="flex h-[248px] gap-1 border border-gray-300 rounded-lg border-dashed  overflow-auto">
            {value.length && value.every(e => e instanceof File)
                ? (
                    <div className="flex flex-row gap-5 p-3">
                        <EachElement
                            of={value}
                            render={(file, index) => (
                                <div key={index} className="relative w-[224px] h-[224px] flex flex-row justify-start gap-2">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        fill
                                        className='object-cover'
                                        alt={''} />
                                    <div className="absolute top-2 right-2">
                                        <Button
                                            className="w-10 h-10"
                                            type="button"
                                            onClick={() => { }}
                                            variant={"destructive"}
                                            size={"icon"}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                ) : value.length && value.every(e => typeof e === "string") ? (
                    <EachElement
                        of={value}
                        render={(v, index) => {
                            const domain = process.env.NEXT_PUBLIC_DOMAIN_IMAGE;
                            return (
                                <div key={index} className="relative w-[224px] h-[224px] flex flex-row justify-start gap-2">
                                    <Image
                                        src={domain + "/" + v}
                                        fill
                                        className='object-cover'
                                        alt={''} />
                                    <div className="absolute top-2 right-2">
                                        <Button
                                            className="w-10 h-10"
                                            type="button"
                                            onClick={() => deleteImage(v)}
                                            variant={"destructive"}
                                            size={"icon"}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            );
                        }}
                    />
                ) : (
                    <div
                        className="flex gap-5 h-full flex-col w-full justify-center items-center"
                        onDrop={handleDrop}
                        onDragOver={handleOnDragOver}
                        onClick={handleMouseEvent}
                        tabIndex={-1}
                    >
                        <Input
                            accept="image/jpeg,image/png"
                            ref={fileRef}
                            className='opacity-0 hidden'
                            autoComplete="off"
                            tabIndex={-1}
                            onChange={onChooseImage}
                            multiple={true}
                            type='file'
                        />
                        <Image src={UploadSVG} alt={''} />
                        <p>Drag and drop the image to upload here or</p>
                        <Button
                            className='rounded-lg'
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                fileRef.current?.click();
                            }}
                        >
                            <Plus />
                            <span>Select Image</span>
                        </Button>
                        <div />
                    </div>
                )}
        </div>
    );
};

export default FileUpload;
