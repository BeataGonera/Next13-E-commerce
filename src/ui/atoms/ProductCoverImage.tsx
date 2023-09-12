type ProductCoverImageProps = {
	product: ProductType;
};

export const ProductCoverImage = ({ product: { image } }: ProductCoverImageProps) => {
	return <img src={image.src} alt={image.alt} width={image.width} height={image.height} />;
};
