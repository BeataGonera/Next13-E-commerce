import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/ui/organisms/Navigation";
import { CartDrawer } from "@/ui/organisms/CartDrawer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

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
			<body className={inter.className}>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
