import { NavLinks } from "./NavLinks";

type Category = {
	name: string;
	slug: string;
};

export const MenuBigScreens = ({
	categories,
}: {
	categories: Category[];
}) => {
	return (
		<ul className="hidden justify-start gap-4 md:flex">
			<NavLinks categories={categories} />
		</ul>
	);
};
