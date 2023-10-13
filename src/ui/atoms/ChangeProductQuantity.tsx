"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "@/app/cart/actions";

export const ChangeProductQuantity = ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);
	return (
		<form className="flex h-36 items-center justify-center gap-4 md:h-48">
			<button
				data-testid="decrement"
				className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
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
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
};
