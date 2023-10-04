import { executeGraphQL } from "@/api/lib";
import { CartGetByIdDocument } from "@/gql/graphql";
import { IncrementProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { formatMoney } from "@/ui/utils";
import { cookies } from "next/headers";

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
		<main className="flex flex-col gap-12 px-4 py-12 md:grid md:grid-cols-2 md:px-24 lg:px-48">
			{cart ? (
				<table>
					<tbody>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</tbody>
					<tbody>
						{cart.orderItems.map((item) => (
							<tr key={item.id}>
								<td>{item.product?.name}</td>
								<td>
									<IncrementProductQuantity
										itemId={item.id}
										quantity={item.quantity}
									/>
								</td>
								{/* <td>{formatMoney(item.product.price / 100)}</td> */}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="text-lg text-gray-900">
					Your cart is empty
				</div>
			)}
		</main>
	);
};

export default CartPage;
