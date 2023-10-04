"use server";

import { setProductQuantity } from "@/api/cart";

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	await setProductQuantity(itemId, quantity);
};
