"use client";

import React, { type FC, useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { ActiveLink } from "../atoms/ActiveLink";

type PaginationProps = {
	pageNumber: number;
	numberOfPages: number;
};

export const Pagination: FC<PaginationProps> = ({
	pageNumber,
	numberOfPages,
}) => {
	const [active, setActive] = useState(pageNumber);
	const router = useRouter();
	const numberOfPagesArray: string[] = [];
	const generatePagesNumbersArray = () => {
		for (let i = 1; i <= numberOfPages; i++) {
			numberOfPagesArray.push(i.toString());
		}
	};

	generatePagesNumbersArray();

	const next = () => {
		setActive(active + 1);
		router.push(`/products/${active}`);
	};

	const prev = () => {
		setActive(active - 1);
		router.push(`/products/${active}`);
	};

	return (
		<div className="flex items-center gap-6" aria-label="pagination">
			{/* <button onClick={next}>Previous</button> */}
			{numberOfPagesArray.map((page, index) => (
				<ActiveLink href={`/products/${page}` as Route} key={index}>
					{page}
				</ActiveLink>
			))}
			{/* <button onClick={prev}>Next</button> */}
		</div>
	);
};
