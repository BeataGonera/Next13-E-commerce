import type { FC } from "react";
import { getVariantsByProductId } from "@/api/products";

type VariantSelectProps = {
	productId: string;
};

export const VariantSelect: FC<VariantSelectProps> = async ({
	productId,
}) => {
	const variants = await getVariantsByProductId(productId);
	return (
		<>
			{variants.length ? (
				<div>
					<p>Wybierz wariant</p>
					<div>
						<select id="variants">
							{/* {variants.map((variant) => (
								<option value={variant.name} className="">
									{variant.name}
								</option>
							))} */}
						</select>
					</div>
				</div>
			) : null}
		</>
	);
};
