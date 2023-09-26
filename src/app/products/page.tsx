import { getProductsWithOffset } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function ProductsPage() {
	const products = await getProductsWithOffset(20, 1);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList products={products} />
		</main>
	);
}
