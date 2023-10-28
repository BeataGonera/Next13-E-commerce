"use client";
import { useTransition, type FC } from "react";
import { useRouter } from "next/navigation";
import { BinIcon } from "./BinIcon";
import { removeItemFromCartAction } from "@/app/cart/actions";

type RemoveButtonProps = {
	itemId: string;
	color: string;
};

export const RemoveButton: FC<RemoveButtonProps> = ({
	itemId,
	color,
}) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<button
			className="cursor-pointer text-red-800 disabled:text-slate-500"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItemFromCartAction(itemId);
					router.refresh();
				});
			}}
		>
			<BinIcon size={18} color={color} />
		</button>
	);
};
