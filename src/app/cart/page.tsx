import { cookies } from "next/headers";
import NextImage from "next/image";
import { paymentAction } from "./actions";
import { executeGraphQL } from "@/api/lib";
import { CartGetByIdDocument } from "@/gql/graphql";
import { ChangeProductQuantity } from "@/ui/atoms/ChangeProductQuantity";
import { RemoveButton } from "@/ui/atoms/RemoveButton";
import { formatMoney } from "@/ui/utils";

const CartPage = async () => {
	const getCart = async () => {
		const cartId = cookies().get("cartId")?.value;
		if (cartId) {
			const { order: cart } = await executeGraphQL({
				query: CartGetByIdDocument,
				variables: {
					id: cartId,
				},
			});
			if (cart) {
				return cart;
			}
		}
	};

	const cart = await getCart();

	return (
		<>
			{cart && cart.orderItems.length ? (
				<div className="flex w-full flex-col gap-8 md:w-3/4">
					<table>
						<tbody>
							<tr className="text-left">
								<th>Image</th>
								<th>Product</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Total</th>
							</tr>
						</tbody>
						<tbody>
							{cart.orderItems.map((item) => (
								<tr
									key={item.id}
									className="h-36 border-b-2 border-slate-200 md:h-48"
								>
									{item.product?.images && (
										<td>
											<NextImage
												src={item.product?.images[0].url}
												alt={item.product.name}
												width={100}
												height={100}
											/>
										</td>
									)}
									<td>{item.product?.name}</td>
									<td className="flex gap-4">
										<ChangeProductQuantity
											itemId={item.id}
											quantity={item.quantity}
										/>
										<RemoveButton itemId={item.id} color={"black"} />
									</td>
									{item.product && (
										<td>{formatMoney(item.product.price / 100)}</td>
									)}
									<td>{formatMoney(item.total / 100)}</td>
								</tr>
							))}
						</tbody>
					</table>

					<p className="text-slate-950">
						Total: {formatMoney(cart.total / 100)}
					</p>

					<form
						action={paymentAction}
						className="flex justify-center"
					>
						<button className="w-full rounded-md bg-slate-950 p-4 text-slate-50 hover:opacity-80 md:w-2/4">
							Pay
						</button>
					</form>
				</div>
			) : (
				<div className="flex h-24 items-center justify-center rounded-sm text-slate-900">
					Add products to the cart to see them here
				</div>
			)}
		</>
	);
};

export default CartPage;
