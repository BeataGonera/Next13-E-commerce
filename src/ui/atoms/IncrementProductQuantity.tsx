"use client";

import { changeItemQuantity } from "@/app/cart/actions";
import { experimental_useOptimistic as useOptimistic } from "react";

export const IncrementProductQuantity = ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);
	return (
		<form className="flex justify-center gap-4">
			<button
				className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
				}}
			>
				-
			</button>
			{optimisticQuantity}
			<button
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
