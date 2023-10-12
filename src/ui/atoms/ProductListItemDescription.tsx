import { formatMoney } from "../utils";
import type { Product } from "@/api/products";

type ProductListItemDescriptionProps = {
	product: Product;
};

export const ProductListItemDescription = ({
	product: { categories, price, name, reviews },
}: ProductListItemDescriptionProps) => {
	const countAverageRating = (total: number, num: number) => {
		return total + num;
	};
	const countRating = () => {
		if (!reviews.length) return;
		const sumWithInitial = reviews
			.map((review) => review.rating)
			.reduce(countAverageRating, 0);
		const averageReview = (sumWithInitial / reviews.length).toFixed(
			1,
		);
		return averageReview;
	};

	const averageReview = countRating();

	return (
		<div className="flex flex-col gap-2 py-2">
			<div className="flex justify-between">
				<h2 className="text-xs font-bold text-slate-800">{name}</h2>
				<p className="text-xs font-bold" data-testid="product-price">
					{formatMoney(price / 100)}
				</p>
			</div>
			{averageReview ? (
				<p className="text-sm text-slate-700">{averageReview}</p>
			) : (
				<p className="text-sm text-slate-700">No reviews yet</p>
			)}
			<p className="text-xs text-slate-600">{categories[0].name}</p>
		</div>
	);
};
