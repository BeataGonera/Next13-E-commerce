"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import {
	getCartFromCookie,
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
	total: number,
) => {
	await setProductQuantity(itemId, quantity, total);
};

export const submitReviewAction = async (
	productId: string,
	formData: FormData,
) => {
	await executeGraphQL({
		query: ReviewCreateDocument,
		variables: {
			productId: productId,
			headline: formData.get("headline") as string,
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			content: formData.get("content") as string,
			rating: Number(formData.get("rating")),
		},
	});
};

export const paymentAction = async () => {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("stripe key not defined");
		return;
	}

	const cart = await getCartFromCookie();

	if (!cart) return;

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems
			.map((item) => ({
				price_data: {
					currency: "pln",
					product_data: {
						name: item.product?.name || "",
					},
					unit_amount: item.product?.price || 0,
				},
				quantity: item.quantity,
			}))
			.filter(Boolean),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/canceled`,
	});
	if (session.url) {
		cookies().set("cartId", "");
		redirect(session.url);
	}
};
