"use client";
import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";

export const ButtonSortByPrice = ({
	products,
	setSortedProducts,
}: {
	products: ProductListItemFragmentFragment[];
	setSortedProducts: Dispatch<
		SetStateAction<ProductListItemFragmentFragment[] | []>
	>;
}) => {
	const router = useRouter();
	const sortProductsByPrice = () => {
		const sortedProducts = products.sort(
			(product1, product2) => product2.price - product1.price,
		);
		setSortedProducts(sortedProducts);
		router.refresh();
	};

	return (
		<button
			className=""
			data-testid="sort-by-price"
			onClick={sortProductsByPrice}
		>
			Sort by price
		</button>
	);
};
