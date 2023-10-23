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
	CartUpdateTotalOrderValueDocument,
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
	console.log(total);
	await executeGraphQL({
		query: CartAddProductDocument,
		variables: {
			orderId: cartId,
			productId: productId,
			total: total,
		},
		cache: "no-store",
	});

	await updateTotalOrderValue();
}

const findExistingProduct = async (
	itemId: string,
	cart: CartFragmentFragment,
) => {
	return cart.orderItems.find((orderItem) => orderItem.id === itemId);
};

const countNewTotalPriceOfOrderItem = async (
	existingProduct: OrderItemFragmentFragment,
	quantity: number,
) => {
	const newTotalPriceOfOrderItem =
		(existingProduct.product?.price as number) * quantity;
	return newTotalPriceOfOrderItem;
};

export const setProductQuantity = async (
	itemId: string,
	quantity: number,
) => {
	const cart = await getCartFromCookie();
	if (!cart) throw new Error("cart not found");

	const existingProduct = await findExistingProduct(itemId, cart);
	if (!existingProduct) return;

	const newTotalPriceOfOrderItem =
		await countNewTotalPriceOfOrderItem(existingProduct, quantity);

	await executeGraphQL({
		query: CartSetProductQuantityDocument,
		variables: {
			id: itemId,
			quantity: quantity,
			newPrice: newTotalPriceOfOrderItem,
			cartId: cart.id,
		},
		cache: "no-store",
	});
	revalidatePath("/cart");

	await updateTotalOrderValue();
};

const updateTotalOrderValue = async () => {
	const cart = await getCartFromCookie();
	if (!cart) throw new Error("cart not found");
	const totalOrderValue = countTotalOrderValue(cart.orderItems);
	await executeGraphQL({
		query: CartUpdateTotalOrderValueDocument,
		variables: {
			cartId: cart.id,
			total: totalOrderValue,
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
	await updateTotalOrderValue();
};

const add = (total: number, num: number) => {
	return total + num;
};
const countTotalOrderValue = (
	orderItems: OrderItemFragmentFragment[],
) => {
	if (!orderItems.length) return 0;
	const toPay = orderItems
		.map((orderItem) => orderItem.total)
		.reduce(add, 0);
	return toPay;
};
