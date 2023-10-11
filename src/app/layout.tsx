import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Navigation } from "@/ui/organisms/Navigation";
import { CartGetByIdDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/api/lib";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "Sklep",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const getCart = async () => {
		const cartId = cookies().get("cartId")?.value;
		if (cartId) {
			const { order: cart } = await executeGraphQL({
				query: CartGetByIdDocument,
				variables: {
					id: cartId,
				},
			});
			if (cart) {
				return cart;
			}
		}
	};

	const cart = await getCart();

	return (
		<html lang="pl">
			<body className={inter.className}>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
