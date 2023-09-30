import type { ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductCoverImageProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductCoverImage = ({
	product: { image },
}: ProductCoverImageProps) => {
	return <img className="h-full w-full object-cover" src={image} />;
};
