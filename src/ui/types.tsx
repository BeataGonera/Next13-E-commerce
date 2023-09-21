export type ImageType = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type ProductType = {
	id: number;
	name: string;
	category: string;
	price: number;
	image: ImageType;
};

export type ProductListType = ProductType[];
