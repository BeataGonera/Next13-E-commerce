import {
	getProductsList,
	getProductsListPaginate,
} from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	const { aggregate } = await getProductsList();
	const numberOfPages = Math.ceil(aggregate / 5);
	const numberOfPagesArray: string[] = [];
	for (let i = 0; i < numberOfPages; i++) {
		numberOfPagesArray.push(i.toString());
	}
	return numberOfPagesArray.map((page) => {
		pageNumber: page;
	});
};

export default async function ProductsPage({
	params,
}: {
	params: {
		pageNumber: string;
	};
}) {
	const { pageNumber } = params;
	const { products, aggregate } = await getProductsListPaginate(
		5,
		(Number(pageNumber) - 1) * 5,
	);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-6 p-8 pt-36 md:p-48">
			<ProductList products={products} />
			<Pagination
				pageNumber={Number(pageNumber)}
				numberOfPages={Math.ceil(aggregate / 5)}
				path="/products/"
			/>
		</main>
	);
}
