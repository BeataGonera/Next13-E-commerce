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
		<>
			<h1 className="text-slate-950">{categoryFromQuery.name}</h1>
			<ProductList products={products} />
			<Pagination
				pageNumber={Number(pageNumber)}
				numberOfPages={numberOfPages}
				path={`/categories/${categoryFromQuery.slug}/`}
			/>
		</>
	);
};

export default CategoryPage;
