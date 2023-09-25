import { ProductCoverImage } from "../atoms/ProductCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import type { ProductType } from "../types";

type ProductListItemProps = {
	product: ProductType;
	key: string;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<li className="flex w-64 flex-col items-center gap-4 border-4 p-4">
			<ProductCoverImage product={product} />
			<ProductListItemDescription product={product} />
		</li>
	);
};
