import { redirect } from "next/navigation";
import Stripe from "stripe";

const cartSuccessPage = async ({
	searchParams,
}: {
	searchParams: { session_id: string };
}) => {
	if (!searchParams.session_id) redirect("/");
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("stripe key not defined");
		return;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.session_id,
	);

	return <h2>{session.payment_status}</h2>;
};

export default cartSuccessPage;
