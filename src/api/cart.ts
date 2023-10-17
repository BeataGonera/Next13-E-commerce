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
	type OrderItemFragmentFragment,
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
		return { id: newCart.id, orderItems: [], total: 0 };
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
	const total = product.product?.price as number;
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
) => {
	const cart = await getCartFromCookie();

	if (!cart) throw new Error("cart not found");

	const toPay = addTotalPricesOfOrderItems(cart.orderItems) as number;
	await executeGraphQL({
		query: CartSetProductQuantityDocument,
		variables: {
			id: itemId,
			quantity: quantity,
			cartId: cart.id,
			toPay,
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

const add = (total: number, num: number) => {
	return total + num;
};
const addTotalPricesOfOrderItems = (
	orderItems: OrderItemFragmentFragment[],
) => {
	if (!orderItems.length) return;
	const toPay = orderItems
		.map((orderItem) => orderItem.total)
		.reduce(add, 0);
	return toPay;
};
