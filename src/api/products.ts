import { ProductsGetListDocument } from "@/gql/graphql";
import { GraphQLResponse, ProductsGraphQLResponse } from "@/ui/types";

type ProductsResponseItem = {
	id: string;
	name: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

const executeGraphQL = async <TQuery, TVariables>(
	query: TQuery,
	variables: TVariables,
) => {
	const res = await fetch(
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln49wtmp4ugq01uo8itz6ibq/master",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	type GraphQLResponse<T> =
		| {
				data?: undefined;
				errors: { message: string }[];
		  }
		| {
				data: T;
				errors?: undefined;
		  };

	const graphqlResponse =
		(await res.json()) as GraphQLResponse<TQuery>;

	return graphqlResponse.data;
};

// export const getProductsList = async () => {
// 	const graphqlResponse = executeGraphQL(ProductsGetListDocument, {});
// 	return graphqlResponse;
// };

export const getProductsList = async () => {
	const res = await fetch(
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln49wtmp4ugq01uo8itz6ibq/master",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: /* GraphQL */ `
					query Products {
						products {
							id
							name
							category
							price
							image
							description
							longDescription
						}
					}
				`,
			}),
		},
	);

	const productsResponse =
		(await res.json()) as GraphQLResponse<ProductsGraphQLResponse>;

	if (productsResponse.errors) {
		throw TypeError(productsResponse.errors[0].message);
	}
	const products = productsResponse.data.products.map((p) => {
		return {
			id: p.id,
			name: p.name,
			category: p.category,
			price: p.price,
			image: {
				src: p.image,
				alt: p.name,
				width: 100,
				height: 100,
			},
			description: p.description,
			longDescription: p.longDescription,
		};
	});
	return products;
};

export const getProductById = async (id: string) => {
	const res = await fetch(
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln49wtmp4ugq01uo8itz6ibq/master",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: /* GraphQL */ `
					query Product($id: ID!) {
						products(where: { id: $id }) {
							id
							name
							category
							price
							image
							description
							longDescription
						}
					}
				`,
				variables: {
					id,
				},
			}),
		},
	);
	const productsResponse =
		(await res.json()) as GraphQLResponse<ProductsGraphQLResponse>;

	if (productsResponse.errors) {
		throw TypeError(productsResponse.errors[0].message);
	}
	const products = productsResponse.data.products.map((p) => {
		return {
			id: p.id,
			name: p.name,
			category: p.category,
			price: p.price,
			image: {
				src: p.image,
				alt: p.name,
				width: 100,
				height: 100,
			},
			description: p.description,
			longDescription: p.longDescription,
		};
	});
	return products[0];
};

export const getProductsWithOffset = async (
	productsPerPage: number,
	activePage: number,
) => {
	const offset = productsPerPage * activePage;
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${productsPerPage}&offset=${offset}`,
	);
	const productsResponse =
		(await res.json()) as ProductsResponseItem[];

	const products = productsResponse.map(
		productsResponseItemToProductResponseType, // point-free
	);

	return products;
};

const productsResponseItemToProductResponseType = (
	productResponse: ProductsResponseItem,
) => {
	return {
		id: productResponse.id,
		name: productResponse.name,
		price: productResponse.price,
		description: productResponse.description,
		category: productResponse.category,
		image: {
			src: productResponse.image,
			alt: productResponse.name,
			width: 100,
			height: 100,
		},
		longDescription: productResponse.longDescription,
	};
};
