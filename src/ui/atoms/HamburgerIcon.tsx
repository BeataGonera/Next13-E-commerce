import { Menu } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const MenuIcon: FC<IconProps> = ({ color, size }) => {
	return <Menu color={color} size={size} />;
};
