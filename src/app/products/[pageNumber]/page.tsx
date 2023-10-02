import {
	getProductsList,
	getProductsListPaginate,
} from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	const products = await getProductsList();
	const numberOfPages = Math.ceil(products.length / 5);
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
	const products = await getProductsListPaginate(
		5,
		Number(pageNumber) * 5,
	);

	const numberOfPages = 2; //ile stron wygenerowało się statycznie??

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-6 p-12 lg:px-24">
			<ProductList products={products} />
			<Pagination
				pageNumber={Number(pageNumber)}
				numberOfPages={numberOfPages}
			/>
		</main>
	);
}
