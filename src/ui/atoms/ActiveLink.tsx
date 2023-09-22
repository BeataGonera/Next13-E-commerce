"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const ActiveLink = ({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) => {
	const currentPathname = usePathname();
	const isActive = href === currentPathname;
	return (
		<Link
			href={href}
			className={clsx(`text-blue-400 hover:text-blue-600`, {
				underline: isActive,
			})}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
