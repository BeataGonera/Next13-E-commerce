import type { FC } from "react";
import { ProductCoverImage } from "./ProductCoverImage";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductImageProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductImage: FC<ProductImageProps> = ({ product }) => {
	return (
		<div className="border-1 w-full rounded-sm border-gray-200 bg-gray-100 p-4">
			<ProductCoverImage
				src={product.images[0].url}
				alt={product.name}
				width={100}
				height={100}
			/>
		</div>
	);
};
