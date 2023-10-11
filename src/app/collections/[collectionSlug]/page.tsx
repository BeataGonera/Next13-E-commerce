import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCollectionSlug } from "@/api/products";

export const generateMetadata = async ({
	params,
}: {
	params: {
		collectionSlug: string;
	};
}) => {
	const { collectionName } = await getProductsByCollectionSlug(
		params.collectionSlug,
	);
	return {
		title: `${collectionName}`,
	};
};

const CollectionPage = async ({
	params,
}: {
	params: {
		collectionSlug: string;
	};
}) => {
	const { collectionSlug } = params;
	const { products, collectionName } =
		await getProductsByCollectionSlug(collectionSlug);

	if (!products) {
		throw notFound();
	}

	return (
		<main className="flex flex-col items-center justify-between gap-12 pt-36 sm:px-6 md:px-24 lg:px-48">
			<h1>{collectionName}</h1>
			<ProductList products={products} />
		</main>
	);
};

export default CollectionPage;
