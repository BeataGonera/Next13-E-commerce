import type { FC } from "react";
import { ProductCoverImage } from "./ProductCoverImage";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductImageProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductImage: FC<ProductImageProps> = ({ product }) => {
	return (
		<div className="border-1 h-3/6 w-full rounded-sm border-gray-200 bg-gray-100 p-4 md:h-4/6">
			<ProductCoverImage product={product} />
		</div>
	);
};
