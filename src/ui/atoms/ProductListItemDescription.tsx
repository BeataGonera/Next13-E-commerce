import { formatMoney } from "../utils";
import type { ProductType } from "../types";

type ProductListItemDescriptionProps = {
	product: ProductType;
};

export const ProductListItemDescription = ({
	product: { category, price, id },
}: ProductListItemDescriptionProps) => {
	return (
		<div>
			<h6>{category}</h6>
			<h4>{id}</h4>
			<h5 className="self-end font-bold">
				{formatMoney(price / 100)}
			</h5>
		</div>
	);
};
