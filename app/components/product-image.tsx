"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
}

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `https://content.ibuypower.com/cdn-cgi/image/width=${width},format=auto,quality=75/https://content.ibuypower.com/Images/Components/${src}?v=d68ea404e8e838c1d75d9a6cb45361d484bf8ea2`;
};

const ProductImage = ({ src }: ProductImageProps) => {
  return (
    <Image
      loader={imageLoader}
      src={src}
      alt="product image"
      width={200}
      height={200}
      priority={true}
    />
  );
};

export default ProductImage;
