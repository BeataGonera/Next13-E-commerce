import { notFound } from "next/navigation";
import { getProductsByCategorySlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

const CategoryPage = async ({
	params,
}: {
	params: {
		category: string;
		pageNumber: string;
	};
}) => {
	const { category } = params;
	const products = await getProductsByCategorySlug(category);

	if (!products) {
		throw notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-12 sm:px-6 md:px-24 lg:px-48">
			<ProductList products={products} />
		</main>
	);
};

export default CategoryPage;
