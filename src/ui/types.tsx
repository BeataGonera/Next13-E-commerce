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
	rating: {
		rate: number;
		count: number;
	};
};

export type ProductListType = ProductType[];
