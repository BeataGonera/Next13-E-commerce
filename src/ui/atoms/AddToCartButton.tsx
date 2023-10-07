"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();
	return (
		<div>
			<button
				type="submit"
				data-testid="add-to-cart-button"
				disabled={formStatus.pending}
				className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-wait disabled:bg-slate-300"
			>
				Add to cart
			</button>
		</div>
	);
};
