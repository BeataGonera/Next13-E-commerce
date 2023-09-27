"use client";
import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

export const ActiveLink = ({
	href,
	children,
}: {
	href: Route;
	children: ReactNode;
}) => {
	const currentPathname = usePathname();
	const ariaCurrent = href === currentPathname ? "page" : undefined;
	const isActive = href === currentPathname;
	return (
		<Link
			href={href}
			aria-current={ariaCurrent}
			className={clsx(`text-blue-400 hover:text-blue-600`, {
				underline: isActive,
			})}
		>
			{children}
		</Link>
	);
};
