import { getProductsListPaginate } from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { CollectionsSections } from "@/ui/organisms/CollectionsSection";

export default async function MainPage() {
	const { products, aggregate } = await getProductsListPaginate(5, 0);

	return (
		<>
			<CollectionsSections />
			<ProductList products={products} />
			<Pagination
				pageNumber={1}
				numberOfPages={Math.ceil(aggregate / 5)}
				path="/products/"
			/>
		</>
	);
}
