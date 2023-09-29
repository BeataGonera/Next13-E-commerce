export type ImageType = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type ProductType = {
	id: string;
	name: string;
	category: string;
	price: number;
	image: ImageType;
	description: string;
	longDescription: string;
};

export type ProductListType = ProductType[];

export type GraphQLResponse<T> =
	| {
			data?: undefined;
			errors: { message: string }[];
	  }
	| {
			data: T;
			errors?: undefined;
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
