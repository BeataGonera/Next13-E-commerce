import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/ui/organisms/Navigation";

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
				<Navigation />
				{children}
			</body>
		</html>
	);
}
