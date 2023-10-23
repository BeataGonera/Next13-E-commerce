"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "@/app/cart/actions";

export const ChangeProductQuantityCartDrawer = ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);

	return (
		<form className="flex items-center justify-center gap-4">
			<button
				data-testid="decrement"
				className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90"
				formAction={async () => {
					if (optimisticQuantity <= 1) return;
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
				}}
			>
				-
			</button>
			<div data-testid="quantity" className="text-slate-50">
				{optimisticQuantity}
			</div>
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
