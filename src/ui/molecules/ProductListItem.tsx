import Link from "next/link";
import type { ProductType } from "../types";
import { ProductCoverImage } from "../atoms/ProductCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductType;
	key: string;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<li className="flex h-full w-full flex-col items-center gap-4">
			<Link
				href={`/product/${product.id}`}
				className="flex h-full w-full flex-col justify-between"
			>
				<div className="border-1 h-48 w-full rounded-sm border-gray-200 bg-gray-100 p-4">
					<ProductCoverImage product={product} />
				</div>
				<ProductListItemDescription product={product} />
			</Link>
		</li>
	);
};
