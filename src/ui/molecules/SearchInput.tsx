"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, useEffect } from "react";

export const SearchInput = () => {
	const [searchedTerm, setSearchedTerm] = useState<string | null>();
	const router = useRouter();
	const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
		setSearchedTerm(e.currentTarget.value);
	};

	useEffect(() => {
		if (!searchedTerm) return;
		const timeout = setTimeout(() => {
			router.push(`/search?query=${searchedTerm}`);
		}, 500);
		return () => clearTimeout(timeout);
	}, [searchedTerm, router]);

	return (
		<div className="relative w-full">
			<input
				type="search"
				id="search-dropdown"
				className="z-2 block w-full rounded-lg border border-gray-300 bg-slate-50 p-2.5 text-sm "
				placeholder="Search"
				required
				onChange={handleOnChange}
			/>
			<button
				type="submit"
				className="absolute right-0 top-0 h-full rounded-r-lg border border-blue-500 bg-blue-500 p-2.5 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
			>
				<svg
					className="h-4 w-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</button>
		</div>
	);
};
