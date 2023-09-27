import { type FC } from "react";
import { ProductListItem } from "../molecules/ProductListItem";
import { type ProductType, type ProductListType } from "../types";

type ProductListPropsType = {
	products: ProductListType;
};

export const ProductList: FC<ProductListPropsType> = async ({
	products,
}) => {
	return (
		<ul
			className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product: ProductType) => (
				<ProductListItem product={product} key={product.id} />
			))}
		</ul>
	);
};
