"use client";

import { ButtonOpenMobileMenu } from "../atoms/ButtonOpenMobileMenu";
import { ButtonCloseMobileMenu } from "../atoms/ButtonCloseMobileMenu";
import { MobileNavLinks } from "./MobileNavlinks";
import { useIsDrawerOpenStore } from "@/state/isMenuDrawerOpen";

type Category = {
	name: string;
	slug: string;
};
export const DrawerMobileMenu = ({
	categories,
}: {
	categories: Category[];
}) => {
	const { isMenuDrawerOpen } = useIsDrawerOpenStore();
	return (
		<>
			<ButtonOpenMobileMenu />
			<div
				className={
					isMenuDrawerOpen
						? "fixed left-0 top-0 h-screen w-screen backdrop-blur-sm md:hidden"
						: "hidden"
				}
			>
				<ButtonCloseMobileMenu />
				<ul className="fixed left-0 top-0 flex h-screen w-80 flex-col gap-4 border-r-2 border-slate-200 bg-white p-12 pt-24">
					<MobileNavLinks categories={categories} />
				</ul>
			</div>
		</>
	);
};
