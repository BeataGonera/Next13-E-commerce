import NextImage from "next/image";
import type { FC } from "react";

type ProductCoverImageProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export const ProductCoverImage: FC<ProductCoverImageProps> = ({
	src,
	alt,
	width,
	height,
}: ProductCoverImageProps) => {
	return (
		<NextImage
			className="h-full w-full object-cover"
			src={src}
			alt={alt}
			width={width}
			height={height}
		/>
	);
};
