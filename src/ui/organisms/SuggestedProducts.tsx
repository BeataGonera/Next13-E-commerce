import { getSuggestedProducts } from "@/api/products";
import { FC } from "react";
import { ProductList } from "./ProductList";

type SuggestedProductsProps = {
	productCategorySlug: string;
};

const SuggestedProducts: FC<SuggestedProductsProps> = async ({
	productCategorySlug,
}) => {
	const products = await getSuggestedProducts(productCategorySlug);
	return (
		<>
			<h3>Suggested products</h3>
			<div data-testid="related-products">
				<ProductList products={products} />
			</div>
		</>
	);
};

export default SuggestedProducts;