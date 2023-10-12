"use server";

import { getProductsOrderedByPrice } from "@/api/products";

export const sortProductsByPriceAction = async () => {
	const _orderedProducts = await getProductsOrderedByPrice();
};
