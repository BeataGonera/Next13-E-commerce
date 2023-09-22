import { ProductList } from "@/ui/organisms/ProductList";

export default function ProductsPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList data-testid="products-list" />
		</main>
	);
}
