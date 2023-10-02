import type { Route } from "next";
import Link from "next/link";
import { ActiveLink } from "../atoms/ActiveLink";
import { ShoppingCartIcon } from "../atoms/ShoppingCartIcon";
import { getCategoriesList } from "@/api/products";

export const Navigation = async () => {
	const categories = await getCategoriesList();
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
		href: `/${category.slug}`,
		label: category.name,
	}));
	const navLinks = [...basicNavLinks, ...categoriesNavLinks];
	return (
		<nav>
			<div className="flex justify-between border-b-2 py-8 sm:px-6 md:pl-24 md:pr-12 lg:pl-48">
				<ul className="flex justify-start gap-4">
					{navLinks.map((link, index) => (
						<li key={index}>
							<ActiveLink href={link.href as Route}>
								{link.label}
							</ActiveLink>
						</li>
					))}
				</ul>
				<div>
					<Link href="/cart">
						<ShoppingCartIcon color={"black"} size={32} />
					</Link>
				</div>
			</div>
		</nav>
	);
};
