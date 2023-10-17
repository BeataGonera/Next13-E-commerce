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
import type { OrderItemFragmentFragment } from "@/gql/graphql";
import { SuggestedProducts } from "@/ui/organisms/SuggestedProducts";

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

async function SingleProductPage({
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
		const cart = await getOrCreateCart(product.price);
		console.log(productId);

		const existingProduct = cart.orderItems.find(
			(item: OrderItemFragmentFragment) =>
				item.product?.id === productId,
		);

		if (existingProduct) {
			const newPrice = (existingProduct.total += existingProduct // jako total pobiera cenę jednostkową
				.product?.price as number);
			await setProductQuantity(
				existingProduct.id,
				existingProduct.quantity + 1,
				newPrice,
			);
		} else {
			await addProductToCart(cart.id, product.id, product.price);
		}

		revalidateTag("cart");
	}

	return (
		<div className="flex flex-col gap-12">
			<div className="grid grid-cols-1 gap-12 md:grid-cols-2">
				<ProductImage product={product} />
				<div>
					<ProductDescription product={product} />
					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>
			<div>
				<SuggestedProducts
					productCategorySlug={product.categories[0].slug}
				/>
				<FormReview productId={product.id} />
			</div>
		</div>
	);
}

export default SingleProductPage;
