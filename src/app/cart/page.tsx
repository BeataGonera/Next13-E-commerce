import { cookies } from "next/headers";
import { executeGraphQL } from "@/api/lib";
import { CartGetByIdDocument } from "@/gql/graphql";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { RemoveButton } from "@/ui/atoms/RemoveButton";
import { paymentAction } from "./actions";

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
		<main className="flex flex-col gap-12 px-4 py-12 md:px-24 lg:px-48">
			{cart ? (
				<>
					<table className="w-2/4">
						<tbody>
							<tr>
								<th>Product</th>
								<th>Quantity</th>
								<th>Price</th>
								<th></th>
							</tr>
						</tbody>
						<tbody>
							{cart.orderItems.map((item) => (
								<tr key={item.id}>
									<td>{item.product?.name}</td>
									<td className="flex gap-4">
										<IncrementProductQuantity
											itemId={item.id}
											quantity={item.quantity}
										/>
										<RemoveButton itemId={item.id} />
									</td>
									{/* <td>{formatMoney(item.product.price / 100)}</td> */}
								</tr>
							))}
						</tbody>
					</table>

					<form action={paymentAction}>
						<button className="w-full rounded-md bg-slate-950 p-4 text-slate-50 hover:opacity-80">
							Pay
						</button>
					</form>
				</>
			) : (
				<div className="text-lg text-gray-900">
					Your cart is empty
				</div>
			)}
		</main>
	);
};

export default CartPage;
