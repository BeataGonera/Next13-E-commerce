import { ProductListItem } from "../molecules/ProductListItem";
import type { ProductListType } from "../types";

const productList: ProductListType = [
	{
		id: 1,
		name: "Koszulka",
		category: "men",
		price: 1234,
		image: {
			src: "/koszulka.webp",
			alt: "koszulka",
			width: 300,
			height: 300,
		},
	},
	{
		id: 1,
		name: "Koszulka",
		category: "men",
		price: 1234,
		image: {
			src: "/koszulka.webp",
			alt: "koszulka",
			width: 300,
			height: 300,
		},
	},
	{
		id: 1,
		name: "Koszulka",
		category: "men",
		price: 1234,
		image: {
			src: "/koszulka.webp",
			alt: "koszulka",
			width: 300,
			height: 300,
		},
	},
	{
		id: 1,
		name: "Koszulka",
		category: "men",
		price: 1234,
		image: {
			src: "/koszulka.webp",
			alt: "koszulka",
			width: 300,
			height: 300,
		},
	},
];

export const ProductList = () => {
	return (
		<section className="grid grid-cols-4 gap-4">
			{productList.map((product) => (
				<ProductListItem product={product} key={product.id} />
			))}
		</section>
	);
};
