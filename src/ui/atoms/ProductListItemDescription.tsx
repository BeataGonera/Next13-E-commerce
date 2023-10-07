import { formatMoney } from "../utils";
import type { ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductListItemDescription = ({
	product: { categories, price, name },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex justify-between">
				<h2 className="text-xs font-bold text-slate-800">{name}</h2>
				<p className="text-xs font-bold" data-testid="product-price">
					{formatMoney(price / 100)}
				</p>
			</div>
			<p className="text-xs text-slate-600">{categories[0].name}</p>
		</div>
	);
};
