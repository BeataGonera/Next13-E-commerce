import type { ProductType } from "../types";

type ProductCoverImageProps = {
	product: ProductType;
};

export const ProductCoverImage = ({
	product: { image },
}: ProductCoverImageProps) => {
	return (
		<img
			className="h-full w-full object-cover"
			src={image.src}
			alt={image.alt}
			width={image.width}
			height={image.height}
		/>
	);
};
