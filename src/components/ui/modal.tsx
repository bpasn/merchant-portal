'use client';

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle
} from "./dialog";


interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties | undefined;
    dismisOutSide: boolean;

}

const Modal: React.FC<ModalProps> = ({
    title,
    description = " ",
    isOpen,
    onClose,
    children,
    className,
    style,
    dismisOutSide
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onChange} >
            <DialogContent onInteractOutside={(e) => {
                e.preventDefault();
                if(dismisOutSide){
                    onClose()
                }
            }} className={cn(
                className,
                "overflow-auto max-h-[calc(100vh_-_10rem)] max-w-md"
            )} style={style}>

                <DialogHeader>
                    <DialogTitle className="text-md">{title}</DialogTitle>
                    <DialogDescription className="text-sm">{description}</DialogDescription>
                </DialogHeader>
                <div className="overflow-auto">{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;