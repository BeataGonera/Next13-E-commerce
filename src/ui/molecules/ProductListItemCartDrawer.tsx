import Image from "next/image";
import { formatMoney } from "../utils";
import { ChangeProductQuantityCartDrawer } from "../atoms/ChangeProductQuantityCartDrawer";
import { RemoveButton } from "../atoms/RemoveButton";
import type { OrderItemFragmentFragment } from "@/gql/graphql";

export const ProductListItemCartDrawer = ({
	product,
}: {
	product: OrderItemFragmentFragment;
}) => {
	return (
		<article className="flex w-full gap-12 border-b-2 border-slate-800 py-4">
			<div className="h-24 w-24 rounded-sm bg-slate-50">
				<Image
					src={product.product?.images[0].url as string}
					alt={product.product?.name as string}
					width={200}
					height={200}
				/>
			</div>
			<div className="flex flex-col justify-between">
				<p className="text-lg text-slate-50">
					{product.product?.name}
				</p>
				<p className="text-sm text-slate-50">
					{formatMoney(product.total / 100)}
				</p>

				<div className="flex w-3/4 justify-between gap-8">
					<RemoveButton itemId={product.id} color={"white"} />
					<ChangeProductQuantityCartDrawer
						itemId={product.id}
						quantity={product.quantity}
					/>
				</div>
			</div>
		</article>
	);
};
