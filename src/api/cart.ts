import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	CartSetProductQuantityDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "./lib";
import { cookies } from "next/headers";

export const getCartFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphQL({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"], // wszytskie wywołania będą miały taki tag
			},
		});
		if (cart) {
			return cart;
		}
	}
};

export const getOrCreateCart = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphQL({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeGraphQL({
		query: CartCreateDocument,
		variables: {},
	});
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
	const product = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});
	if (!product)
		throw new Error(`Product with id ${productId} not found`);

	await executeGraphQL({
		query: CartAddProductDocument,
		variables: {
			orderId: cartId,
			productId: productId,
			total: 1,
		},
	});
}

export const setProductQuantity = async (
	itemId: string,
	quantity: number,
) => {
	await executeGraphQL({
		query: CartSetProductQuantityDocument,
		variables: {
			id: itemId,
			quantity: quantity,
		},
	});
};
