import { notFound } from "next/navigation";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";
import SuggestedProducts from "@/ui/organisms/SuggestedProducts";

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
	params, // searchParams,
}: {
	params: { productId: string };
}) {
	const { productId } = params;
	const product = await getProductById(productId);

	if (!product) {
		notFound();
	}

	return (
		<main className="min-h-screen">
			<div className="flex flex-col gap-12 px-4 py-12 md:grid md:grid-cols-2 md:px-24 lg:px-48">
				<ProductImage product={product} />
				<ProductDescription product={product} />
			</div>
			<div className="flex gap-4 px-4 md:px-24 ">
				<SuggestedProducts
					productCategorySlug={product.categories[0].slug}
				/>
			</div>
			<div>
				<p>Wybierz rozmiar:</p>
				<p>Wybierz kolor:</p>
			</div>
		</main>
	);
}

export default singleProductPage;
