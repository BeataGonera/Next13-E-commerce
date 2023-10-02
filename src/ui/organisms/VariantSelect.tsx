import { getVariantsByProductId } from "@/api/products";
import { FC } from "react";

type VariantSelectProps = {
	productId: string;
};

const VariantSelect: FC<VariantSelectProps> = async ({
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
							{variants.map((variant) => (
								<option value={variant.name} className="">
									{variant.name}
								</option>
							))}
						</select>
					</div>
				</div>
			) : null}
		</>
	);
};

export default VariantSelect;
