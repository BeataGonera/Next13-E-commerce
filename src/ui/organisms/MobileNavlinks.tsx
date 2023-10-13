"use client";

import type { Route } from "next";
import Link from "next/link";
import { useIsDrawerOpenStore } from "@/state/isMenuDrawerOpen";

type Category = {
	name: string;
	slug: string;
};

export const MobileNavLinks = ({
	categories,
}: {
	categories: Category[];
}) => {
	const { setIsMenuDrawerOpen } = useIsDrawerOpenStore();
	const basicNavLinks = [
		{
			href: "/",
			label: "Home",
		},
		{
			href: "/products",
			label: "All",
		},
	];
	const categoriesNavLinks = categories.map((category) => ({
		href: `/categories/${category.slug}`,
		label: category.name,
	}));
	const navLinks = [...basicNavLinks, ...categoriesNavLinks];

	return (
		<>
			{navLinks.map((link, index) => (
				<li key={index} className="flex items-center">
					<Link
						href={link.href as Route}
						onClick={() => setIsMenuDrawerOpen(false)}
					>
						{link.label}
					</Link>
				</li>
			))}
		</>
	);
};
