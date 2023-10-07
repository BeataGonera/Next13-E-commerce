import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import { SearchInput } from "../molecules/SearchInput";
import { CartButton } from "../atoms/CartButton";
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
		href: `/categories/${category.slug}/1`,
		label: category.name,
	}));
	const navLinks = [...basicNavLinks, ...categoriesNavLinks];
	return (
		<div className="flex h-24 justify-between border-b-2 py-8 sm:px-6 md:px-24 lg:px-48">
			<nav>
				<ul className="flex justify-start gap-4">
					{navLinks.map((link, index) => (
						<li key={index} className="flex items-center">
							<ActiveLink href={link.href as Route}>
								{link.label}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>

			<div className="flex w-2/6 items-center gap-4">
				<SearchInput />
				<CartButton quantity={quantity} />
			</div>
		</div>
	);
};
