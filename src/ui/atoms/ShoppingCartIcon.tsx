import { ShoppingCart } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const ShoppingCartIcon: FC<IconProps> = ({ color, size }) => {
	return <ShoppingCart color={color} size={size} />;
};
