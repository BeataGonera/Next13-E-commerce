import { ProductType } from "@/ui/types";

type ProductsResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductsList = async () => {
	const res = await fetch(
		"https://naszsklep-api.vercel.app/api/products",
	);
	const productsResponse =
		(await res.json()) as ProductsResponseItem[];
	const products = productsResponse.map(
		productsResponseItemToProductResponseType, // point-free
	);
	return products;
};

export const getProductById = async (id: string) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);
	const productResponse = (await res.json()) as ProductsResponseItem;
	productsResponseItemToProductResponseType(productResponse);
};

const productsResponseItemToProductResponseType = (
	productResponse: ProductsResponseItem,
) => {
	return {
		id: productResponse.id,
		name: productResponse.title,
		price: productResponse.price,
		description: productResponse.description,
		category: productResponse.category,
		rating: {
			rate: productResponse.rating.rate,
			count: productResponse.rating.count,
		},
		image: {
			src: productResponse.image,
			alt: productResponse.title,
			width: 100,
			height: 100,
		},
		longDescription: productResponse.longDescription,
	};
};
