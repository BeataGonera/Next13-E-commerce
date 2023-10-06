import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCollectionSlug } from "@/api/products";

export const generateMetadata = async ({
	params,
}: {
	params: {
		collectionName: string;
	};
}) => {
	return {
		title: `Kolekcja ${params.collectionName} - Sklep internetowy`,
	};
};

const CollectionPage = async ({
	params,
}: {
	params: {
		collectionName: string;
	};
}) => {
	const { collectionName } = params;
	const products = await getProductsByCollectionSlug(collectionName);

	if (!products) {
		throw notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-12 sm:px-6 md:px-24 lg:px-48">
			<h1>{collectionName}</h1>
			<ProductList products={products} />
		</main>
	);
};

export default CollectionPage;
