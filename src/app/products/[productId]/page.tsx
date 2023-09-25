import { getProductById, getProductsList } from "@/api/products";

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
