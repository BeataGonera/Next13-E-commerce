"use client";

import { CloseIcon } from "./CloseIcon";
import { useIsDrawerOpenStore } from "@/state/isMenuDrawerOpen";

export const ButtonCloseMobileMenu = () => {
	const { setIsMenuDrawerOpen } = useIsDrawerOpenStore();
	return (
		<button
			className="absolute left-12 top-12 z-20"
			onClick={() => setIsMenuDrawerOpen(false)}
		>
			<CloseIcon size={24} color="gray" />
		</button>
	);
};
