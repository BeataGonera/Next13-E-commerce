"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useIsCartDrawerOpenStore } from "@/state/isCartDrawerOpen";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();
	const { setIsCartDrawerOpen } = useIsCartDrawerOpenStore();

	return (
		<div className="flex justify-center md:justify-start">
			<button
				type="submit"
				data-testid="add-to-cart-button"
				disabled={formStatus.pending}
				className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:opacity-80 disabled:cursor-wait disabled:bg-slate-300 md:w-48"
				onClick={() => setIsCartDrawerOpen(true)}
			>
				Add to cart
			</button>
		</div>
	);
};
