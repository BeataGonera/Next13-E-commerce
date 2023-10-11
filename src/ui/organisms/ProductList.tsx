"use client";

import { useState, type FC } from "react";
import { ProductListItem } from "../molecules/ProductListItem";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";
import { SelectSortProducts } from "../atoms/SelectSortProducts";

type ProductListPropsType = {
	products: ProductListItemFragmentFragment[];
};

export const ProductList: FC<ProductListPropsType> = ({
	products,
}) => {
	const [productsToDisplay, setProductsToDisplay] =
		useState(products);
	return (
		<div className="flex w-full flex-col gap-4">
			<SelectSortProducts
				setProductsToDisplay={setProductsToDisplay}
			/>
			<ul
				className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
				data-testid="products-list"
			>
				{productsToDisplay.map((product) => (
					<ProductListItem product={product} key={product.id} />
				))}
			</ul>
		</div>
	);
};
