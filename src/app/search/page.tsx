"use client";

import { getProductsByName } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { notFound } from "next/navigation";
import { useEffect } from "react";

const SearchResults = async ({
	searchParams,
}: {
	searchParams?: { [key: string]: string };
}) => {
	if (!searchParams) notFound();

	const products = await getProductsByName(searchParams.query);

	return (
		<main className="flex flex-col gap-12 px-48 py-12">
			<h2 className="text-lg text-slate-900">
				Searching for: {searchParams.query}
			</h2>
			{products.length ? (
				<ProductList products={products} />
			) : (
				<h2 className="text-lg text-slate-900">No results</h2>
			)}
		</main>
	);
};

export default SearchResults;
