import type { Route } from "next";
import Link from "next/link";
import { ActiveLink } from "../atoms/ActiveLink";
import { ShoppingCartIcon } from "../atoms/ShoppingCartIcon";
import { SearchInput } from "../molecules/SearchInput";
import { getCategoriesList } from "@/api/products";
import { getCartFromCookie } from "@/api/cart";

export const Navigation = async () => {
	const cart = await getCartFromCookie();
	const categories = await getCategoriesList();

	const quantity = cart?.orderItems.length ?? 0;
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
		<nav>
			<div className="flex justify-between border-b-2 py-8 sm:px-6 md:px-24 lg:px-48">
				<ul className="flex justify-start gap-4">
					{navLinks.map((link, index) => (
						<li key={index} className="flex items-center">
							<ActiveLink href={link.href as Route}>
								{link.label}
							</ActiveLink>
						</li>
					))}
				</ul>
				<div className="flex w-2/6 items-center gap-4">
					<SearchInput />
					<Link href="/cart" className="flex items-end">
						<ShoppingCartIcon color={"black"} size={32} />
						<span className=" flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-slate-50">
							{quantity}
						</span>
						<span className="sr-only">items in cart, view bag </span>
					</Link>
				</div>
			</div>
		</nav>
	);
};
