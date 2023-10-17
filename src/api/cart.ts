import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
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

export const getOrCreateCart = async (
	total?: number,
): Promise<CartFragmentFragment> => {
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

	if (!total) throw new Error("total order value not found");

	const { createOrder: newCart } = await executeGraphQL({
		query: CartCreateDocument,
		variables: { total: total },
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
	total: number,
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
			total: total,
		},
	});
}

export const setProductQuantity = async (
	itemId: string,
	quantity: number,
	total: number,
) => {
	await executeGraphQL({
		query: CartSetProductQuantityDocument,
		variables: {
			id: itemId,
			quantity: quantity,
			total: total,
		},
		cache: "no-store",
	});
	revalidatePath("/cart");
};

export const removeProductFromCart = async (itemId: string) => {
	await executeGraphQL({
		query: CartRemoveProductDocument,
		variables: { itemId: itemId },
		cache: "no-store",
	});
};
