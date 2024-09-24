import Image from "next/image";
import NoImage from '@/assets/image/no-image.jpg'
import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
const ImageProvider = ({
    src,
    ...props
}: Omit<React.ComponentPropsWithRef<typeof Image>,"alt">) => {
    const [image,setImage] = React.useState<string | StaticImport>(process.env.NEXT_PUBLIC_DOMAIN_IMAGE + "/" + src);
    return (
        <Image src={image} {...props} alt={"product"} onError={() => setImage(NoImage)} />
    );
};

export default ImageProvider;