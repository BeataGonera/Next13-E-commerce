import { cookies } from "next/headers";
import { executeGraphQL } from "./lib";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragmentFragment,
	CartGetByIdDocument,
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";

export const getCartFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphQL({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			cache: "no-store",
			next: {
				tags: ["cart"], // wszytskie wywołania będą miały taki tag
			},
		});
		if (cart) {
			return cart;
		}
	}
};

export const getOrCreateCart =
	async (): Promise<CartFragmentFragment> => {
		const cartId = cookies().get("cartId")?.value;
		if (cartId) {
			const { order: cart } = await executeGraphQL({
				query: CartGetByIdDocument,
				variables: {
					id: cartId,
				},
				cache: "no-store",
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
		return { id: newCart.id, orderItems: [] };
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
		cache: "no-store",
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
		cache: "no-store",
	});
};

export const removeProductFromCart = async (itemId: string) => {
	await executeGraphQL({
		query: CartRemoveProductDocument,
		variables: { itemId: itemId },
		cache: "no-store",
	});
};
