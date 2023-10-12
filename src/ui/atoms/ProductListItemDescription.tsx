import { formatMoney } from "../utils";
import type { Product } from "@/api/products";

type ProductListItemDescriptionProps = {
	product: Product;
};

export const ProductListItemDescription = ({
	product: { categories, price, name, averageRating },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex justify-between">
				<h2 className="text-xs font-bold text-slate-800">{name}</h2>
				<p className="text-xs font-bold" data-testid="product-price">
					{formatMoney(price / 100)}
				</p>
			</div>
			{averageRating ? (
				<p
					className="text-sm text-slate-700"
					data-testid="product-rating"
				>
					{averageRating}
				</p>
			) : (
				<p
					className="text-sm text-slate-700"
					data-testid="product-rating"
				>
					{5}
				</p>
			)}
			<p className="text-xs text-slate-600">{categories[0].name}</p>
		</div>
	);
};
