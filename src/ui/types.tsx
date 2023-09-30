export type ImageType = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type ProductsGraphQLResponse = {
	products: {
		id: string;
		name: string;
		category: string;
		price: number;
		description: string;
		longDescription: string;
		image: string;
	}[];
};
