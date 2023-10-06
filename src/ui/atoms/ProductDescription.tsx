import type { FC } from "react";
import { formatMoney } from "../utils";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductDescriptionProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductDescription: FC<ProductDescriptionProps> = ({
	product,
}) => {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold text-gray-800">
				{product.name}
			</h1>
			<p className="text-lg">{formatMoney(product.price / 100)}</p>
			<p className="text-gray-500">{product.description}</p>
			<p className="text-xs font-bold text-gray-500">In stock</p>
		</div>
	);
};
