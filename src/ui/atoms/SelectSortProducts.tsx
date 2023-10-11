"use client";

import { getProductsOrderedByPrice } from "@/api/products";
import { ProductListItemFragmentFragment } from "@/gql/graphql";
import {
	type ChangeEvent,
	useEffect,
	useState,
	type FC,
	type Dispatch,
	type SetStateAction,
} from "react";

type SelectSortProductsProps = {
	setProductsToDisplay: Dispatch<
		SetStateAction<ProductListItemFragmentFragment[]>
	>;
};

export const SelectSortProducts: FC<SelectSortProductsProps> = ({
	setProductsToDisplay,
}) => {
	const options = [
		{
			value: "",
			text: "Sort by:",
			dataTestId: "",
		},
		{
			value: "sort-by-price",
			text: "price",
			dataTestId: "sort-by-price",
		},
		{
			value: "sort-by-rating",
			text: "rating",
			dataTestId: "sort-by-rating",
		},
	];
	const [selectedValue, setSelectedValue] = useState(
		options[0].value,
	);

	const getProductsOrderedByPriceMethod = async () => {
		const productsOrderedByPrice = await getProductsOrderedByPrice();
		setProductsToDisplay(productsOrderedByPrice);
	};

	const getProductsOrderedByReatingMethod = async () => {};

	useEffect(() => {
		if (selectedValue == "") return;
		if (selectedValue === "sort-by-price") {
			getProductsOrderedByPriceMethod();
		} else if (selectedValue === "sort-by-rating") {
			getProductsOrderedByReatingMethod();
		}
	}, [selectedValue]);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
	};

	return (
		<select
			className="self-end"
			onChange={handleChange}
			value={selectedValue}
		>
			{options.map((option) => (
				<option
					key={option.value}
					value={option.value}
					data-testid={option.dataTestId}
				>
					{option.text}
				</option>
			))}
		</select>
	);
};
