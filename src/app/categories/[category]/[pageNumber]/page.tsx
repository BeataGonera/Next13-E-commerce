import { notFound } from "next/navigation";
import { getProductsByCategorySlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/organisms/Pagination";

export const generateMetadata = async ({
	params,
}: {
	params: {
		category: string;
	};
}) => {
	return {
		title: `${
			params.category.charAt(0).toUpperCase() +
			params.category.slice(1)
		}`,
	};
};

const CategoryPage = async ({
	params,
}: {
	params: {
		category: string;
		pageNumber: string;
	};
}) => {
	const { category } = params;
	const { products, categoryName } =
		await getProductsByCategorySlug(category); // tu powinien pobierać 5 // dokończyć paginację
	const numberOfPages = Math.ceil(products.length / 5);

	if (!products) {
		throw notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between pt-36 sm:px-6 md:px-24 lg:px-48">
			<h1 className="text-slate-950">{categoryName}</h1>
			<ProductList products={products} />
			<Pagination pageNumber={1} numberOfPages={numberOfPages} />
		</main>
	);
};

export default CategoryPage;
