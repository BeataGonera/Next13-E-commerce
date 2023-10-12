import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCollectionSlug } from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";

export const generateMetadata = async ({
	params,
}: {
	params: {
		collectionSlug: string;
	};
}) => {
	const { collectionName } = await getProductsByCollectionSlug(
		params.collectionSlug,
		5,
		0,
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
	const { products, collectionName, aggregate } =
		await getProductsByCollectionSlug(collectionSlug, 5, 0);

	if (!products) {
		throw notFound();
	}

	return (
		<main className="flex flex-col items-center justify-between gap-12 pt-36 sm:px-6 md:px-24 lg:px-48">
			<h1 className="text-xl font-semibold text-slate-800">
				{collectionName}
			</h1>
			<ProductList products={products} />
			<Pagination
				path={`/collections/${collectionSlug}/`}
				pageNumber={0}
				numberOfPages={Math.ceil(aggregate / 5)}
			/>
		</main>
	);
};

export default CollectionPage;
