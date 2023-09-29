import { getProductById } from "@/api/products";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";

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
			images: [product.image.src],
		},
	};
};

async function singleProductPage({
	params, // searchParams,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);

	return (
		<main className=" flex min-h-screen flex-col gap-12 px-4 py-12 md:grid md:grid-cols-2 md:px-24 lg:px-48">
			<ProductImage product={product} />
			<ProductDescription product={product} />
		</main>
	);
}

export default singleProductPage;
