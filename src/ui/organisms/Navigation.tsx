import { SearchInput } from "../molecules/SearchInput";
import { CartButton } from "../atoms/CartButton";
import { DrawerMobileMenu } from "./DrawerMobileMenu";
import { MenuBigScreens } from "./MenuBigScreens";
import { getCartFromCookie } from "@/api/cart";
import { getCategoriesList } from "@/api/products";

export const Navigation = async () => {
	const cart = await getCartFromCookie();
	const productsInCartQuantity = cart?.orderItems.length ?? 0;
	const categories = await getCategoriesList();

	return (
		<div className="fixed z-20 flex h-24 w-screen justify-between border-b-2 bg-white px-6 py-8 md:px-24 lg:px-48">
			<nav className="flex items-center">
				<MenuBigScreens categories={categories} />
				<DrawerMobileMenu categories={categories} />
			</nav>

			<div className="flex items-center gap-2 text-blue-700 md:gap-4">
				<SearchInput />
				<CartButton productsInCartQuantity={productsInCartQuantity} />
			</div>
		</div>
	);
};
