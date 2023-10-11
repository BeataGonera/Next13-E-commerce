"use server";

import { getProductsOrderedByPrice } from "@/api/products";

export const sortProductsByPriceAction = async () => {
	const orderedProducts = await getProductsOrderedByPrice();
};
