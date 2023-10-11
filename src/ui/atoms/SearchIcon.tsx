import { Search } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const SearchIcon: FC<IconProps> = ({ color, size }) => {
	return <Search color={color} size={size} />;
};
