import { ProductListItem } from "../molecules/ProductListItem";
import { getProductsList } from "@/api/products";

export const ProductList = async () => {
	const productsList = await getProductsList();

	return (
		<ul
			className="grid grid-cols-4 gap-4"
			data-testid="products-list"
		>
			{productsList.map((product) => (
				<ProductListItem product={product} key={product.id} />
			))}
		</ul>
	);
};
