import { getCollectionsList } from "@/api/collections";
import {
	getProductsList,
	getProductsListPaginate,
} from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import Image from "next/image";
import Link from "next/link";

export default async function MainPage() {
	const products = await getProductsList();
	const productsPaginated = await getProductsListPaginate(5, 0);
	const numberOfPages = Math.ceil(products.length / 5);
	const collections = await getCollectionsList();

	return (
		<main className="p-24">
			<section className="mb-8 grid grid-cols-3 gap-4">
				{collections.map((collection) => (
					<div>
						<Link href={`/collections/${collection.slug}`}>
							<Image
								src={collection.image.url}
								alt={collection.name}
								width={300}
								height={300}
								className="h-full w-full"
							/>
							{collection.slug}
						</Link>
					</div>
				))}
			</section>

			<ProductList products={productsPaginated} />
			<Pagination pageNumber={1} numberOfPages={numberOfPages} />
		</main>
	);
}
