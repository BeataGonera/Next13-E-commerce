import { formatMoney } from "../utils";
import { ProductType } from "../types";

type ProductListItemDescriptionProps = {
	product: ProductType;
};

export const ProductListItemDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div>
			<h6>{category}</h6>
			<h4>{name}</h4>
			<h5 className="self-end font-bold">
				{formatMoney(price / 100)}
			</h5>
		</div>
	);
};
