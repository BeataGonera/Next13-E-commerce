import { create } from "zustand";

type IsCartDrawerOpenState = {
	isCartDrawerOpen: boolean;
	setIsCartDrawerOpen: (isMenuDrawerOpen: boolean) => void;
};

export const useIsCartDrawerOpenStore =
	create<IsCartDrawerOpenState>()((set) => ({
		isCartDrawerOpen: false,
		setIsCartDrawerOpen: (isCartDrawerOpen: boolean) =>
			set({ isCartDrawerOpen }),
	}));
