import { getProductsList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { notFound } from "next/navigation";

export default async function ProductsPage() {
	const products = await getProductsList();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-12 sm:px-6 md:px-24 lg:px-48">
			<ProductList products={products} />
		</main>
	);
}
