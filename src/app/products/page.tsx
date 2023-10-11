import {
	getProductsList,
	getProductsListPaginate,
} from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function ProductsPage() {
	const products = await getProductsList();
	const productsPaginated = await getProductsListPaginate(5, 0);
	const numberOfPages = Math.ceil(products.length / 5);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 pt-36 md:p-48">
			<ProductList products={productsPaginated} />
			<Pagination pageNumber={1} numberOfPages={numberOfPages} />
		</main>
	);
}
