"use client";

import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByName } from "@/api/products";

const SearchResults = async ({
	searchParams,
}: {
	searchParams?: { [key: string]: string };
}) => {
	if (!searchParams) notFound();

	const products = await getProductsByName(searchParams.query);

	return (
		<>
			<h2 className="text-lg text-slate-900">
				Searching for: {searchParams.query}
			</h2>
			{products.length ? (
				<ProductList products={products} />
			) : (
				<h2 className="text-lg text-slate-900">No results</h2>
			)}
		</>
	);
};

export default SearchResults;
