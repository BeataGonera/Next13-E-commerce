"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { ButtonDecrementProductQuantity } from "./ButtonDecrementProductQuantity";
import { ButtonIncrementProductQuantity } from "./ButtonIncrementProductQuantity";
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
		<div className="flex h-36 items-center justify-center gap-4 md:h-48">
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
