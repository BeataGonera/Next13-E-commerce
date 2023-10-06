import { getProductsListPaginate } from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function MainPage() {
	const products = await getProductsListPaginate(5, 0);

	return (
		<div>
			<h1>HomePage</h1>
			<ProductList products={products} />
		</div>
	);
}
