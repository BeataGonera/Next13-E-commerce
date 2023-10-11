import { ChevronRightCircle } from "lucide-react";
import type { FC } from "react";

type IconProps = {
	color: string;
	size: number;
};

export const ChevronRightIcon: FC<IconProps> = ({ color, size }) => {
	return <ChevronRightCircle color={color} size={size} />;
};
