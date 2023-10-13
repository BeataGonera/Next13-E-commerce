import Link from "next/link";
import { ShoppingCartIcon } from "./ShoppingCartIcon";

export const CartButton = ({
	productsInCartQuantity,
}: {
	productsInCartQuantity: number;
}) => {
	return (
		<>
			<Link href="/cart" className="flex items-end">
				<ShoppingCartIcon color={"black"} size={32} />
				<span className=" flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-slate-50">
					{productsInCartQuantity}
				</span>
				<span className="sr-only">items in cart, view bag </span>
			</Link>
		</>
	);
};
