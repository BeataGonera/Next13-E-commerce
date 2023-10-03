import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "./lib";
import { cookies } from "next/headers";

export const getOrCreateCart = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphQL(
			CartGetByIdDocument,
			{
				id: cartId,
			},
		);
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeGraphQL(
		CartCreateDocument,
		{},
	);
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
};

export async function addProductToCart(
	cartId: string,
	productId: string,
) {
	const product = await executeGraphQL(ProductGetByIdDocument, {
		id: productId,
	});
	if (!product)
		throw new Error(`Product with id ${productId} not found`);

	await executeGraphQL(CartAddProductDocument, {
		orderId: cartId,
		productId: productId,
		total: 1,
	});
}
