export default async function singleProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	// const getProductById = () => {

	// }

	// const product = getProductById(params.productId)

	const referral = searchParams.referral.toString();

	return (
		//div będzie w layoucie
		<div>
			<h1>Single product page</h1>
			<p>{params.productId}</p>
			<p>{referral}</p>

			{/* <SingleProductTemplate product = {product} /> */}
		</div>
	);
}
