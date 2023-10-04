"use server";

import {
	removeProductFromCart,
	setProductQuantity,
} from "@/api/cart";

export const removeItemFromCartAction = async (itemId: string) => {
	await removeProductFromCart(itemId);
};

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	await setProductQuantity(itemId, quantity);
};
