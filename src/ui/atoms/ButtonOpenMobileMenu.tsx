"use client";

import { MenuIcon } from "./HamburgerIcon";
import { useIsDrawerOpenStore } from "@/state/isMenuDrawerOpen";

export const ButtonOpenMobileMenu = () => {
	const { setIsMenuDrawerOpen } = useIsDrawerOpenStore();
	return (
		<button
			className="flex items-center justify-center text-blue-700 md:hidden"
			aria-label="Menu"
			onClick={() => {
				setIsMenuDrawerOpen(true);
			}}
		>
			<MenuIcon size={24} color="rgb(59 130 246)" />
		</button>
	);
};
