import { getProductsListPaginate } from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function ProductsPage() {
	const { products, aggregate } = await getProductsListPaginate(5, 0);
	const numberOfPages = Math.ceil(aggregate / 5);

	return (
		<>
			<ProductList products={products} />
			<Pagination
				pageNumber={1}
				numberOfPages={numberOfPages}
				path="/products/"
			/>
		</>
	);
}
