import { notFound } from "next/navigation";
import { getProductsOrderedByPrice } from "@/api/products";
import { CollectionsSections } from "@/ui/organisms/CollectionsSection";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

const SortPage = async ({
	searchParams,
	params,
}: {
	searchParams?: { [key: string]: string };
	params: { pageNumber: string };
}) => {
	if (!searchParams) notFound();
	const skip = (Number(params.pageNumber) - 1) * 5;

	const { products, aggregate } = await getProductsOrderedByPrice(
		5,
		skip,
	);
	if (!products) notFound();
	return (
		<>
			<CollectionsSections />
			<ProductList products={products} />
			<Pagination
				pageNumber={Number(params.pageNumber)}
				numberOfPages={Math.ceil(aggregate / 5)}
				path={`/sort/`}
			/>
		</>
	);
};

export default SortPage;
