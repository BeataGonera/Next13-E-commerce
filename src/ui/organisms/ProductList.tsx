"use client";

import { useState, type FC, useEffect } from "react";
import { ProductListItem } from "../molecules/ProductListItem";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";
import { ButtonSortByPrice } from "../atoms/ButtonSortByPrice";

type ProductListPropsType = {
	products: ProductListItemFragmentFragment[];
};

export const ProductList: FC<ProductListPropsType> = ({
	products,
}) => {
	const [sortedProducts, setSortedProducts] =
		useState<ProductListItemFragmentFragment[]>(products);

	return (
		<>
			<ul
				className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
				data-testid="products-list"
			>
				{sortedProducts.map((product) => (
					<ProductListItem product={product} key={product.id} />
				))}
			</ul>
			<ButtonSortByPrice
				products={products}
				setSortedProducts={setSortedProducts}
			/>
		</>
	);
};
