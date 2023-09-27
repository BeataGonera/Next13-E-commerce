import { getProductsWithOffset } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function ProductsPage() {
	const products = await getProductsWithOffset(20, 1);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-12 sm:px-6 md:px-24 lg:px-48">
			<ProductList products={products} />
		</main>
	);
}
