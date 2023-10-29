"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { ButtonIncrementProductQuantity } from "./ButtonIncrementProductQuantity";
import { ButtonDecrementProductQuantity } from "./ButtonDecrementProductQuantity";
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
		<div className="flex items-center justify-center gap-4">
			<form
				action={async () => {
					if (optimisticQuantity <= 1) return;
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
				}}
			>
				<ButtonDecrementProductQuantity />
			</form>
			<div data-testid="quantity">{optimisticQuantity}</div>
			<form
				action={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				<ButtonIncrementProductQuantity />
			</form>
		</div>
	);
};
