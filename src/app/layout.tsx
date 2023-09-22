import ActiveLink from "@/ui/atoms/ActiveLink";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sklep",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pl">
			<body>
				<nav>
					<ul className="mt-4 flex justify-center gap-4">
						<li>
							<ActiveLink href={"/"}>Home</ActiveLink>
						</li>
						<li>
							<ActiveLink href={"/products"}>Produkty</ActiveLink>
						</li>
					</ul>
				</nav>
				{children}
			</body>
		</html>
	);
}
