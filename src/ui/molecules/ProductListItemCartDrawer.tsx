import Image from "next/image";
import { OrderItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "../utils";
import { BinIcon } from "../atoms/BinIcon";

const ProductListItemCartDrawer = ({
	product,
}: {
	product: OrderItemFragmentFragment;
}) => {
	return (
		<article className="flex gap-4 border-b-2 border-slate-800 py-4">
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
					{formatMoney((product.product?.price as number) / 100)}
				</p>

				<button className="text-start text-sm uppercase text-slate-400">
					Remove
				</button>
			</div>
		</article>
	);
};

export default ProductListItemCartDrawer;
