import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const ButtonIncrementProductQuantity = () => {
	const formStatus = useFormStatus();
	return (
		<button
			data-testid="increment"
			className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-300 hover:opacity-90 disabled:cursor-wait"
			disabled={formStatus.pending}
		>
			+
		</button>

		//tu dodać throtling
	);
};
