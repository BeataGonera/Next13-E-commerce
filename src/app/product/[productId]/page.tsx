import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import {
	addProductToCart,
	getOrCreateCart,
	setProductQuantity,
} from "@/api/cart";
import { FormReview } from "@/ui/organisms/FormReview";

export const generateMetadata = async ({
	params,
}: {
	params: {
		productId: string;
	};
}) => {
	const product = await getProductById(params.productId);

	return {
		title: `Produkt ${product.name} - Sklep internetowy`,
		description: `${product.description}`,
		openGraph: {
			title: `Produkt ${product.name} - Sklep internetowy`,
			description: product.description,
			images: [product.images[0].url],
		},
	};
};

async function singleProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const { productId } = params;
	const product = await getProductById(productId);

	if (!product) {
		notFound();
	}

	async function addToCartAction() {
		"use server";
		const cart = await getOrCreateCart();

		if (cart.orderItems) {
			const existingProduct = cart.orderItems.find(
				(item) => item.product.id === product.id,
			);
			if (existingProduct) {
				await setProductQuantity(
					existingProduct.id,
					existingProduct.quantity + 1,
				);
			} else {
				await addProductToCart(cart.id, product.id);
			}
		} else {
			await addProductToCart(cart.id, product.id);
		}
		revalidateTag("cart");
	}

	return (
		<main className="min-h-screen">
			<div className="flex flex-col gap-12 px-4 py-12 md:grid md:grid-cols-2 md:px-24 lg:px-48">
				<ProductImage product={product} />
				<div>
					<ProductDescription product={product} />
					{/* <VariantSelect productId={params.productId} /> */}
					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>
			<div className="px-4 md:px-24 lg:px-48 ">
				{/* <SuggestedProducts
					productCategorySlug={product.categories[0].slug}
				/> */}
				<FormReview productId={product.id} />
			</div>
		</main>
	);
}

export default singleProductPage;
