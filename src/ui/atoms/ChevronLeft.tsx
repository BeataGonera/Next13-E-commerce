import { ChevronLeftCircle } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const ChevronLeftIcon: FC<IconProps> = ({ color, size }) => {
	return <ChevronLeftCircle color={color} size={size} />;
};
