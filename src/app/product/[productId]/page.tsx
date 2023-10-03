import { notFound } from "next/navigation";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";
import { SuggestedProducts } from "@/ui/organisms/SuggestedProducts";
import { VariantSelect } from "@/ui/organisms/VariantSelect";
import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { addProductToCart, getOrCreateCart } from "@/api/cart";
import { cookies } from "next/headers";
import { CartGetByIdDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/api/lib";

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
		await addProductToCart(cart.id, product.id);
	}

	return (
		<main className="min-h-screen">
			<div className="flex flex-col gap-12 px-4 py-12 md:grid md:grid-cols-2 md:px-24 lg:px-48">
				<ProductImage product={product} />
				<div>
					<ProductDescription product={product} />
					<VariantSelect productId={params.productId} />
					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>
			<div className="px-4 md:px-24 lg:px-48 ">
				<SuggestedProducts
					productCategorySlug={product.categories[0].slug}
				/>
			</div>
		</main>
	);
}

export default singleProductPage;
