"use client";

import { type FC, useState } from "react";
import { CloseIcon } from "../atoms/CloseIcon";
import { ProductListItemCartDrawer } from "../molecules/ProductListItemCartDrawer";
import { CartFragmentFragment } from "@/gql/graphql";

type CartDrawerProps = {
	cart: CartFragmentFragment;
};

export const CartDrawer: FC<CartDrawerProps> = ({ cart }) => {
	const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(true);
	return (
		<div
			className={`fixed left-0 top-0 h-screen w-screen backdrop-blur-sm ${
				isCartDrawerOpen ? "block" : "hidden"
			}`}
		>
			<div
				className={`fixed right-0 top-0 z-10 flex h-full w-1/3 flex-col gap-4 bg-slate-900 ${
					isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex h-24 items-center justify-between border-b-2 border-slate-800 p-12">
					<h2 className="text-center text-lg font-thin text-slate-50">
						Cart
					</h2>
					<button onClick={() => setIsCartDrawerOpen(false)}>
						<CloseIcon color="white" size={24} />
					</button>
				</div>
				<div className="flex h-full flex-col justify-between p-12">
					{cart?.orderItems.length ? (
						<div>
							{cart?.orderItems.map((item, index) => (
								<ProductListItemCartDrawer
									product={item}
									key={index}
								/>
							))}
						</div>
					) : (
						<div>Your cart is empty</div>
					)}
					<div className="flex flex-col gap-4">
						<p className="text-xl text-slate-50">Total:</p>
						<button className="h-12 w-full bg-slate-100 text-lg hover:bg-slate-50">
							Pay
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
