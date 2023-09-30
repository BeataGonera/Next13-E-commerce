import { getProductsList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	const products = await getProductsList();
	const numberOfPages = Math.ceil(products.length / 20);
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
	// const { pageNumber } = params;
	// const productsPerPage = 20;
	const products = await getProductsList();
	// const products = await getProductsWithOffset(
	// 	productsPerPage,
	// 	Number(pageNumber) * productsPerPage,
	// );
	// const numberOfPages = Math.ceil(
	// 	productsAll.length / productsPerPage,
	// );

	return (
		<main className="flex min-h-screen flex-col items-center justify-between gap-6 p-12 lg:px-24">
			<ProductList products={products} />
			{/* <Pagination
				pageNumber={Number(pageNumber)}
				numberOfPages={numberOfPages}
			/> */}
		</main>
	);
}
