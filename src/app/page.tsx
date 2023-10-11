import Image from "next/image";
import Link from "next/link";
import { getCollectionsList } from "@/api/collections";
import {
	getProductsList,
	getProductsListPaginate,
} from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function MainPage() {
	const products = await getProductsList();
	const productsPaginated = await getProductsListPaginate(5, 0);
	const numberOfPages = Math.ceil(products.length / 5);
	const collections = await getCollectionsList();

	return (
		<main className="flex flex-col items-center p-8 pt-36 md:p-48">
			<section className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
				{collections.map((collection) => (
					<div key={collection.slug}>
						<Link
							href={`/collections/${collection.slug}`}
							className="flex flex-col items-center gap-2 md:gap-4"
						>
							<Image
								src={collection.image.url}
								alt={collection.name}
								width={300}
								height={300}
								className="h-full w-full rounded-sm text-slate-900"
							/>
							{collection.name}
						</Link>
					</div>
				))}
			</section>

			<ProductList products={productsPaginated} />
			<Pagination pageNumber={1} numberOfPages={numberOfPages} />
		</main>
	);
}
