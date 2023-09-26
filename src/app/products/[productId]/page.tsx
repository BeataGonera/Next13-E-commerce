import { getProductById, getProductsList } from "@/api/products";

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

export const generateStaticParams = async () => {
	const products = await getProductsList();
	return products
		.map((product) => {
			productId: product.id;
		})
		.slice(0, 3);
};

export default async function singleProductPage({
	params, // searchParams,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);

	return (
		<div>
			<h1>{product.name}</h1>
		</div>
	);
}
