import { Trash2 } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const BinIcon: FC<IconProps> = ({ color, size }) => {
	return <Trash2 color={color} size={size} />;
};
