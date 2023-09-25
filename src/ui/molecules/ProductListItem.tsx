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
		<li className="flex w-64 flex-col items-center gap-4 border-4 p-4">
			<Link href={`/products/${product.id}`}>
				<ProductCoverImage product={product} />
				<ProductListItemDescription product={product} />
			</Link>
		</li>
	);
};
