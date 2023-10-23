import type { FC } from "react";
import { getVariantsByProductId } from "@/api/products";
import type { ProductColor, ProductSize } from "@/gql/graphql";

type VariantSelectProps = {
	productId: string;
};

type Variant = {
	name: string;
	color: ProductColor;
	size: ProductSize;
};

export const VariantSelect: FC<VariantSelectProps> = async ({
	productId,
}) => {
	const variants = (await getVariantsByProductId(
		productId,
	)) as Variant[];
	return (
		<>
			{variants[0] && variants[0].name ? (
				<div className="mt-4 flex flex-col gap-2 text-sm text-slate-950">
					<select
						id="variants"
						className="w-48 rounded-sm border-2 border-slate-300 p-2 text-slate-950"
					>
						{variants.map((variant) => (
							<option value={variant.name} key={variant.name}>
								{variant.name}
							</option>
						))}
					</select>
				</div>
			) : null}
		</>
	);
};
