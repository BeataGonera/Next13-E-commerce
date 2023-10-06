import { X } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const CloseIcon: FC<IconProps> = ({ color, size }) => {
	return <X color={color} size={size} />;
};
