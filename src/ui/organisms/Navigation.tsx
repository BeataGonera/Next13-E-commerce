import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import { SearchInput } from "../molecules/SearchInput";
import { CartButton } from "../atoms/CartButton";
import { MenuIcon } from "../atoms/HamburgerIcon";
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
		<div className="fixed flex h-24 w-screen justify-between border-b-2 bg-white px-6 py-8 md:px-24 lg:px-48">
			<nav className="flex items-center">
				<button className="flex items-center justify-center text-blue-700 md:hidden">
					<MenuIcon size={24} color="rgb(59 130 246)" />
				</button>
				<ul className="hidden justify-start gap-4 md:flex">
					{navLinks.map((link, index) => (
						<li key={index} className="flex items-center">
							<ActiveLink href={link.href as Route}>
								{link.label}
							</ActiveLink>
						</li>
					))}
				</ul>
				{/* <div className="fixed left-0 top-0 h-screen w-screen backdrop-blur-sm">
					<button className="absolute left-12 top-12 z-20">
						<CloseIcon size={24} color="gray" />
					</button>
					<ul className="fixed left-0 top-0 flex h-screen w-80 flex-col gap-4 border-r-2 border-slate-200 bg-white p-12 pt-24">
						{navLinks.map((link, index) => (
							<li key={index} className="flex items-center">
								<ActiveLink href={link.href as Route}>
									{link.label}
								</ActiveLink>
							</li>
						))}
					</ul>
				</div> */}
			</nav>

			<div className="flex items-center gap-4 text-blue-700">
				<SearchInput />
				{/* <SearchIcon size={24} color="rgb(59 130 246)" /> */}
				<CartButton quantity={quantity} />
			</div>
		</div>
	);
};
