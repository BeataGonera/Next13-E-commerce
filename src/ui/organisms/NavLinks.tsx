import type { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

type Category = {
	name: string;
	slug: string;
};

export const NavLinks = ({
	categories,
}: {
	categories: Category[];
}) => {
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
					<ActiveLink href={link.href as Route}>
						{link.label}
					</ActiveLink>
				</li>
			))}
		</>
	);
};
