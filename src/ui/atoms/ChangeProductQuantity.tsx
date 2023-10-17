"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "@/app/cart/actions";

export const ChangeProductQuantity = ({
	itemId,
	quantity,
	total,
	productPrice,
}: {
	itemId: string;
	quantity: number;
	total: number;
	productPrice: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);

	const newTotalPriceInceremented = total + productPrice;
	const newTotalPriceDecremented = total - productPrice;
	return (
		<form className="flex h-36 items-center justify-center gap-4 md:h-48">
			<button
				data-testid="decrement"
				className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(
						itemId,
						optimisticQuantity - 1,
						newTotalPriceDecremented,
					);
				}}
			>
				-
			</button>
			<div data-testid="quantity">{optimisticQuantity}</div>
			<button
				data-testid="increment"
				className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(
						itemId,
						optimisticQuantity + 1,
						newTotalPriceInceremented,
					);
				}}
			>
				+
			</button>
		</form>
	);
};
