type ImageType = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

type ProductType = {
	id: number;
	name: string;
	category: string;
	price: number;
	image: ImageType;
};

type _ProductListType = ProductType[];
