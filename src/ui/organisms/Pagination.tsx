"use client";

import React, { type FC } from "react";
import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

type PaginationProps = {
	pageNumber: number;
	numberOfPages: number;
	path: string;
};

export const Pagination: FC<PaginationProps> = ({
	numberOfPages,
	path,
}) => {
	const numberOfPagesArray: string[] = [];
	const generatePagesNumbersArray = () => {
		for (let i = 1; i <= numberOfPages; i++) {
			numberOfPagesArray.push(i.toString());
		}
	};

	generatePagesNumbersArray();

	return (
		<>
			{numberOfPages > 1 ? (
				<div
					className="flex items-center gap-6"
					aria-label="pagination"
				>
					{numberOfPagesArray.map((page, index) => (
						<ActiveLink href={`${path}${page}` as Route} key={index}>
							{page}
						</ActiveLink>
					))}
				</div>
			) : null}
		</>
	);
};
