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
	const { category, pageNumber } = params;
	const skip = (Number(pageNumber) - 1) * 5;
	const { products, categoryFromQuery, aggregate } =
		await getProductsByCategorySlug(5, skip, category);
	const numberOfPages = Math.ceil(aggregate / 5);

	if (!products) {
		throw notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center pt-36 sm:px-6 md:px-24 lg:px-48">
			<h1 className="text-slate-950">{categoryFromQuery.name}</h1>
			<ProductList products={products} />
			<Pagination
				pageNumber={Number(pageNumber)}
				numberOfPages={numberOfPages}
				path={`/categories/${categoryFromQuery.slug}/`}
			/>
		</main>
	);
};

export default CategoryPage;
