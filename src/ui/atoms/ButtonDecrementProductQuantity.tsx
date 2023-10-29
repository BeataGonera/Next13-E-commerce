import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const ButtonDecrementProductQuantity = () => {
	const formStatus = useFormStatus();
	return (
		<button
			data-testid="decrement"
			className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90 disabled:cursor-wait"
			disabled={formStatus.pending}
		>
			-
		</button>
	);
};
