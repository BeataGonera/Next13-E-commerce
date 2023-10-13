"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, useEffect } from "react";
import { Search } from "lucide-react";

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
		<div className="flex w-full items-center gap-4 rounded-lg border-2 border-slate-100 bg-slate-50 pr-2 ">
			<input
				type="search"
				id="search"
				className="z-2 hover w-full rounded-lg bg-slate-50 p-2 text-sm text-slate-950 focus:outline-none active:border-none"
				placeholder="Search"
				required
				onChange={handleOnChange}
			/>
			<Search color="grey" />
		</div>
	);
};
