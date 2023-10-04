"use server";

import {
	removeProductFromCart,
	setProductQuantity,
} from "@/api/cart";
import { executeGraphQL } from "@/api/lib";
import { ReviewCreateDocument } from "@/gql/graphql";

export const removeItemFromCartAction = async (itemId: string) => {
	await removeProductFromCart(itemId);
};

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	await setProductQuantity(itemId, quantity);
};

export const submitReviewAction = async (
	productId: string,
	formData: FormData,
) => {
	await executeGraphQL({
		query: ReviewCreateDocument,
		variables: {
			productId: productId,
			headline: formData.get("title") as string,
			name: formData.get("username") as string,
			email: formData.get("email") as string,
			content: formData.get("content") as string,
			rating: Number(formData.get("rating")) as number,
		},
	});
};
