import { graphql } from "@/gql";
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
				<h4 className="text-xs font-bold text-slate-800">{name}</h4>
				<h5 className="text-xs font-bold">
					{formatMoney(price / 100)}
				</h5>
			</div>
			<h6 className="text-xs text-slate-600">{categories[0].name}</h6>
		</div>
	);
};
